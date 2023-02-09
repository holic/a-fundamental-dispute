source .env.mainnet

# forge verify-contract --compiler-version "v0.8.13+commit.abaa5c0e" --num-of-optimizations 200 \
#   --constructor-args $(cast abi-encode "constructor(address,address,address)" "0xf01DfAC37DD149Cb686E05d06cd21930B011F10F" "0x879fa72912012b3906c5FE41E83A72E140300203" "0xC9C022FCFebE730710aE93CA9247c5Ec9d9236d0") \
#   0x0C60B40289Ff15fF6AfDfa668D1a743dc6e53cF3 packages/contracts/src/AFD.sol:AFundamentalDispute $ETHERSCAN_API_KEY

# forge verify-contract --compiler-version "v0.8.13+commit.abaa5c0e" --num-of-optimizations 200 \
#   --constructor-args $(cast abi-encode "constructor(address,address)" "0x0C60B40289Ff15fF6AfDfa668D1a743dc6e53cF3" "0x9746fD0A77829E12F8A9DBe70D7a322412325B91") \
#   0xa5286E7202C374fAAE3d9714Dd26dBb4f6091476 packages/contracts/src/AFDRenderer.sol:AFDRenderer $ETHERSCAN_API_KEY
