// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {ContentStore} from "ethfs/ContentStore.sol";
import {FileStore} from "ethfs/FileStore.sol";
import {IFileStore} from "ethfs/IFileStore.sol";
import {AFundamentalDispute} from "../src/AFD.sol";
import {AFDRenderer} from "../src/AFDRenderer.sol";
import {IRenderer} from "../src/IRenderer.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockFoldedFaces is ERC721 {
    constructor() ERC721("Folded Faces", "FF") {}

    function mint(uint256 tokenId) public {
        _mint(msg.sender, tokenId);
    }
}

contract MockRenderer is IRenderer, Test {
    function tokenURI(uint256 tokenId)
        external
        view
        override
        returns (string memory)
    {
        return
            string.concat("https://example.com/tokens/", vm.toString(tokenId));
    }
}

contract MockERC20 is ERC20 {
    constructor() ERC20("Mock ERC20", "MOCK") {}

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}

contract AFDTest is Test {
    AFundamentalDispute private token;

    ContentStore private contentStore = new ContentStore();
    FileStore private fileStore = new FileStore(contentStore);
    MockFoldedFaces private foldedFaces = new MockFoldedFaces();

    address private artist = makeAddr("artist");
    address private developer = makeAddr("developer");
    address private owner = makeAddr("owner");
    address private minter = makeAddr("minter");
    address private holder = makeAddr("holder");

    function setUp() public {
        vm.deal(owner, 10 ether);
        vm.deal(minter, 10 ether);
        vm.deal(holder, 10 ether);

        vm.startPrank(owner);
        token = new AFundamentalDispute(
            IERC721(foldedFaces),
            artist,
            developer
        );
        AFDRenderer renderer = new AFDRenderer(token, IFileStore(fileStore));
        token.setRenderer(renderer);
        vm.stopPrank();

        assertEq(token.balanceOf(artist), 14);
        assertEq(token.balanceOf(developer), 6);
        assertEq(token.ownershipOf(1).extraData, 1445488);
        assertEq(token.ownershipOf(2).extraData, 1445488);
        assertEq(token.ownershipOf(15).extraData, 13126949);
        assertEq(token.ownershipOf(16).extraData, 13126949);
    }

    function testMint() public {
        vm.startPrank(minter);
        assertEq(token.balanceOf(minter), 0);

        vm.expectRevert(
            abi.encodeWithSelector(
                AFundamentalDispute.WrongPayment.selector,
                0.1 ether
            )
        );
        token.mint{value: 1 ether}();

        token.mint{value: 0.1 ether}();
        assertEq(token.balanceOf(minter), 1);
        uint256 tokenId = token.totalMinted();
        assertEq(tokenId, 21);
        assertEq(token.ownerOf(tokenId), minter);

        vm.expectRevert(
            abi.encodeWithSelector(
                AFundamentalDispute.MintLimitExceeded.selector,
                1
            )
        );
        token.mint{value: 0.1 ether}();
        vm.stopPrank();
    }

    function testFoldedFacesMint() public {
        vm.startPrank(holder);
        assertEq(
            token.balanceOf(holder),
            0,
            "expected holder to have no AFD tokens"
        );

        vm.expectRevert(
            abi.encodeWithSelector(
                AFundamentalDispute.WrongPayment.selector,
                0.08 ether
            )
        );
        token.foldedFacesMint{value: 1 ether}(1);

        vm.expectRevert(bytes("ERC721: invalid token ID"));
        token.foldedFacesMint{value: 0.08 ether}(1);

        foldedFaces.mint(1);
        assertEq(token.hasUsedFoldedFaces(1), false);
        token.foldedFacesMint{value: 0.08 ether}(1);
        assertEq(token.hasUsedFoldedFaces(1), true);

        foldedFaces.safeTransferFrom(holder, minter, 1);

        vm.stopPrank();

        vm.startPrank(minter);
        assertEq(
            token.balanceOf(minter),
            0,
            "expected minter to have no AFD tokens"
        );
        foldedFaces.mint(2);
        assertEq(foldedFaces.balanceOf(minter), 2);
        assertEq(foldedFaces.ownerOf(1), minter);
        assertEq(foldedFaces.ownerOf(2), minter);
        assertEq(token.hasUsedFoldedFaces(1), true);
        assertEq(token.hasUsedFoldedFaces(2), false);

        vm.expectRevert(
            abi.encodeWithSelector(
                AFundamentalDispute.TokenDiscountAlreadyUsed.selector,
                address(foldedFaces),
                1
            )
        );
        token.foldedFacesMint{value: 0.08 ether}(1);

        token.foldedFacesMint{value: 0.08 ether}(2);

        vm.stopPrank();
    }

    function testTokenURI() public {
        bytes memory p5jsScript = "/* pretend this is p5.js */";
        bytes memory afdScript = "/* pretend this is afd.js */";
        bytes memory gunzipScript = "/* pretend this is gunzipScripts.js */";

        bytes32[] memory checksums = new bytes32[](1);

        (bytes32 p5jsChecksum, ) = contentStore.addContent(p5jsScript);
        checksums[0] = p5jsChecksum;
        fileStore.createFile("p5-1.5.0.js.gz", checksums);

        (bytes32 adfChecksum, ) = contentStore.addContent(afdScript);
        checksums[0] = adfChecksum;
        fileStore.createFile("afd-p5.min.js.gz", checksums);

        (bytes32 gunzipChecksum, ) = contentStore.addContent(gunzipScript);
        checksums[0] = gunzipChecksum;
        fileStore.createFile("gunzipScripts-0.0.1.js", checksums);

        vm.prank(minter);
        token.mint{value: 0.1 ether}();

        assertEq(
            token.tokenURI(1),
            "data:application/json,%7B%22name%22%3A%22A%20Fundamental%20Dispute%201%2F218%22%2C%22description%22%3A%22A%20long-form%20generative%20art%20collection%20using%20p5.js%2C%20made%20fully%20on-chain%20with%20EthFS.%5Cn%5Cn%20%20Art%20by%20%40genlight%2C%20smart%20contracts%20by%20%40frolic%22%2C%22external_url%22%3A%22https%3A%2F%2Fafundamentaldispute.com%2Fart%2F1%22%2C%22image%22%3A%22https%3A%2F%2Fafundamentaldispute.com%2Fapi%2Fart-placeholder%2F1%22%2C%22animation_url%22%3A%22data%3Atext%2Fhtml%2C%250A%2520%2520%253Cmeta%2520charset%253D%2522UTF-8%2522%253E%250A%2520%2520%253Cmeta%2520name%253D%2522viewport%2522%2520content%253D%2522width%253Ddevice-width%252C%2520initial-scale%253D1.0%2522%253E%250A%2520%2520%253Ctitle%253EA%2520Fundamental%2520Dispute%253C%252Ftitle%253E%250A%250A%2520%2520%253Cstyle%253E%250A%2520%2520%2520%2520*%2520%257B%250A%2520%2520%2520%2520%2520%2520box-sizing%253A%2520border-box%253B%250A%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520html%252C%250A%2520%2520%2520%2520body%2520%257B%250A%2520%2520%2520%2520%2520%2520width%253A%2520100vw%253B%250A%2520%2520%2520%2520%2520%2520height%253A%2520100vh%253B%250A%2520%2520%2520%2520%2520%2520margin%253A%25200%253B%250A%2520%2520%2520%2520%2520%2520background%253A%2520%2523111%253B%250A%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520canvas%2520%257B%250A%2520%2520%2520%2520%2520%2520display%253A%2520block%253B%250A%2520%2520%2520%2520%2520%2520margin%253A%2520auto%253B%250A%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520body.fullscreen%2520canvas%2520%257B%250A%2520%2520%2520%2520%2520%2520width%253A%25201200px%2520!important%253B%250A%2520%2520%2520%2520%2520%2520height%253A%25201650px%2520!important%253B%250A%2520%2520%2520%2520%257D%250A%2520%2520%2520%2520body%253Anot(.fullscreen)%2520canvas%2520%257B%250A%2520%2520%2520%2520%2520%2520padding%253A%25208vmin%253B%250A%2520%2520%2520%2520%2520%2520width%253A%2520100%2525%2520!important%253B%250A%2520%2520%2520%2520%2520%2520height%253A%2520100%2525%2520!important%253B%250A%2520%2520%2520%2520%2520%2520object-fit%253A%2520contain%253B%250A%2520%2520%2520%2520%257D%250A%2520%2520%253C%252Fstyle%253E%250A%250A%2520%2520%253Cscript%253E%250A%2520%2520%2520%2520const%2520seed%2520%253D%25203134858404%253B%250A%250A%2520%2520%2520%2520document.addEventListener(%2522click%2522%252C%2520(event)%2520%253D%253E%2520%257B%250A%2520%2520%2520%2520%2520%2520const%2520x%2520%253D%2520event.clientX%2520%252F%2520document.body.clientWidth%253B%250A%2520%2520%2520%2520%2520%2520const%2520y%2520%253D%2520event.clientY%2520%252F%2520document.body.clientHeight%253B%250A%2520%2520%2520%2520%2520%2520document.body.classList.toggle(%2522fullscreen%2522)%253B%250A%2520%2520%2520%2520%2520%2520document.body.scrollTo(%257B%250A%2520%2520%2520%2520%2520%2520%2520%2520left%253A%2520document.body.scrollWidth%2520*%2520x%2520-%2520document.body.clientWidth%2520%252F%25202%252C%250A%2520%2520%2520%2520%2520%2520%2520%2520top%253A%2520document.body.scrollHeight%2520*%2520y%2520-%2520document.body.clientHeight%2520%252F%25202%250A%2520%2520%2520%2520%2520%2520%257D)%253B%250A%2520%2520%2520%2520%257D)%253B%250A%2520%2520%253C%252Fscript%253E%250A%250A%2520%2520%253Cscript%2520type%253D%2522text%252Fjavascript%252Bgzip%2522%2520src%253D%2522data%253Atext%252Fjavascript%253Bbase64%252C/* pretend this is p5.js */%2522%253E%253C%252Fscript%253E%250A%2520%2520%253Cscript%2520type%253D%2522text%252Fjavascript%252Bgzip%2522%2520src%253D%2522data%253Atext%252Fjavascript%253Bbase64%252C/* pretend this is afd.js */%2522%253E%253C%252Fscript%253E%250A%2520%2520%253Cscript%2520src%253D%2522data%253Atext%252Fjavascript%253Bbase64%252C/* pretend this is gunzipScripts.js */%2522%253E%253C%252Fscript%253E%250A%22%7D"
        );

        MockRenderer renderer = new MockRenderer();
        vm.expectRevert(bytes("Ownable: caller is not the owner"));
        token.setRenderer(renderer);
        vm.prank(owner);
        token.setRenderer(renderer);

        assertEq(token.tokenURI(1), "https://example.com/tokens/1");
    }

    function testWithdraw() public {
        vm.prank(minter);
        token.mint{value: 0.1 ether}();

        vm.prank(holder);
        token.mint{value: 0.1 ether}();

        assertEq(address(token).balance, 0.2 ether);
        assertEq(artist.balance, 0 ether);

        vm.expectRevert(bytes("Ownable: caller is not the owner"));
        token.withdrawAll(artist);
        vm.prank(owner);
        token.withdrawAll(artist);
        assertEq(artist.balance, 0.2 ether);

        assertEq(foldedFaces.balanceOf(address(token)), 0);
        vm.prank(minter);
        foldedFaces.mint(1);
        vm.prank(minter);
        vm.expectRevert("ERC721: transfer to non ERC721Receiver implementer");
        foldedFaces.safeTransferFrom(minter, address(token), 1);
        vm.prank(minter);
        foldedFaces.transferFrom(minter, address(token), 1);
        assertEq(foldedFaces.balanceOf(address(token)), 1);

        assertEq(foldedFaces.balanceOf(artist), 0);
        vm.prank(owner);
        token.withdrawERC721(foldedFaces, 1, artist);
        assertEq(foldedFaces.balanceOf(artist), 1);

        MockERC20 erc20 = new MockERC20();
        vm.prank(minter);
        erc20.mint(minter, 100);
        assertEq(erc20.balanceOf(address(token)), 0);
        vm.prank(minter);
        erc20.transfer(address(token), 100);
        assertEq(erc20.balanceOf(address(token)), 100);

        assertEq(erc20.balanceOf(artist), 0);
        vm.prank(owner);
        token.withdrawAllERC20(erc20, artist);
        assertEq(erc20.balanceOf(artist), 100);
    }
}
