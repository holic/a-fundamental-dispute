let palettes = [
  [
    //0 dark mode
    "#22223b", //22223b; e5989b
    "white",
  ],
  [
    //1 light mode
    "white",
    "#22223b",
  ],
  [
    //2 dark mode with gold
    "#22223b",
    "#FFD700",
  ],

  [
    //3 sunset mode
    "#b56576", //22223b; e5989b
    "#22223b",
  ],

  [
    //4 sunrise mode
    "#f9e488", //22223b; e5989b
    "#22223b",
  ],
  
   [
    //5 
    "#b56576", //22223b; e5989b
    "white",
  ],
];

function setup() {
  createCanvas(400, 550);
  randomSeed(seed);
  noiseSeed(seed);
  colorMode(HSL, 360, 100, 100, 100);
  noLoop();
  pixelDensity(5);
  treecount = random([100,150,150,150,150,50,150,150,25,200,150]);
  cloudnum = random([75, 75, 150, 75, 75, 35, 75, 75, 75, 75, 200]);
}

const tick = () => new Promise((resolve) => requestAnimationFrame(resolve));

async function draw() {
  darkmode = random([1, 1, 2, 2, 2, 2, 2, 3, 3, 4, 4]);
  backmix = random([3, 4, 5]);
  if (darkmode == 1) {
    //darkmode
    background(palettes[0][0]);
  } else if (darkmode == 2) {
    //regular
    background(palettes[1][0]);
  } else if (darkmode == 3) {
    //dark + gold-lined clouds
    background(palettes[0][0]);
  } else if (darkmode == 4) {
    //dark + gold-lined clouds
    background(palettes[backmix][0]);
  }

  //i have a custom 'texture' generator at bottom of this that just draws thousands of transparent bezier squiggles
  texture = random([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 , 2]); // set to 1 to have 'texture' on

  sun = random([1, 2, 3, 4]);
  
   if (sun == 4) {
     //stars
    
     push();
    x = random(25, width - 25);
    y = random(25, 200);
    moonsize = random([10, 20, 40, 10, 20]);
    moonwarp = random([4, 5, 6, 8]);
    translate(x, y);
    noStroke();
    if (darkmode == 1) {
      fill(palettes[0][1]);
    } else if (darkmode == 2) {
      fill(palettes[1][1]);
    } else if (darkmode == 3) {
      fill(palettes[0][1]);
    } else if (darkmode == 4) {
      fill(palettes[backmix][1]);
    }
    circle(0, 0, moonsize);
    if (darkmode == 1) {
      fill(palettes[0][0]);
    } else if (darkmode == 2) {
      fill(palettes[1][0]);
    } else if (darkmode == 3) {
      fill(palettes[0][0]);
    } else if (darkmode == 4) {
      fill(palettes[backmix][0]);
    }
    circle(moonsize / moonwarp, -moonsize / moonwarp, moonsize);
    pop();
    
    push()
    
    if (darkmode == 1) {
      stroke(palettes[0][1]);
    } else if (darkmode == 2) {
      stroke(palettes[1][1]);
    } else if (darkmode == 3) {
      stroke(palettes[0][1]);
    } else if (darkmode == 4) {
      stroke(palettes[backmix][1]);
    }
    
     if (darkmode == 1) {
      fill(palettes[0][1]);
    } else if (darkmode == 2) {
      fill(palettes[1][1]);
    } else if (darkmode == 3) {
      fill(palettes[0][1]);
    } else if (darkmode == 4) {
      fill(palettes[backmix][1]);
    }
    
    
//   let loops = 1;
//   while (loops--) {
//     x = random(25, width - 25);
//     y = random(25, 325);

//     push();
//     translate(x, y);
//     rotate(random(360));
//     starsize = 1;
//     noFill();
//     beginShape();
//     vertex(0, 0);
//     vertex(starsize, starsize * 2);
//     vertex(starsize * 2, starsize * 4);
//     vertex(0, starsize * 3);
//     vertex(-starsize * 2, starsize * 4);
//     vertex(-starsize, starsize * 2);
//     vertex(0, 0);
//     endShape();
//     pop();
//   }
  
   let loopss = 45;
  while (loopss--) {
    x = random(25, width - 25);
    y = random(25, 325);

    push();
    translate(x, y);
    rotate(random(360));
    starsize2 = 2;
    fill("white")
    circle(0,0,starsize2/random(0.5,3))
    pop();
  }
  
  let loopsss = 55;
  while (loopsss--) {
    x = random(25, width - 25);
    y = random(25, 325);

   push()
  translate(x,y)
  starsize3 = random(0.5,2)
    numlines = random(2,10)
  for (b = 0; b < numlines; b += 1) {
  rotate(random(360))
  line(0,0,starsize3,starsize3)
  }
  pop()
  }
    
    pop()
    
  }

  if (sun == 2) {
    push();
    x = random(25, width - 25);
    y = random(25, 200);
    moonsize = random([10, 20, 40, 10, 20]);
    moonwarp = random([4, 5, 6, 8]);
    translate(x, y);
    noStroke();
    if (darkmode == 1) {
      fill(palettes[0][1]);
    } else if (darkmode == 2) {
      fill(palettes[1][1]);
    } else if (darkmode == 3) {
      fill(palettes[0][1]);
    } else if (darkmode == 4) {
      fill(palettes[backmix][1]);
    }
    circle(0, 0, moonsize);
    if (darkmode == 1) {
      fill(palettes[0][0]);
    } else if (darkmode == 2) {
      fill(palettes[1][0]);
    } else if (darkmode == 3) {
      fill(palettes[0][0]);
    } else if (darkmode == 4) {
      fill(palettes[backmix][0]);
    }
    circle(moonsize / moonwarp, -moonsize / moonwarp, moonsize);
    await tick();
    pop();
  }

  push();
  if (darkmode == 1) {
    stroke(palettes[0][1]);
  } else if (darkmode == 2) {
    stroke(palettes[1][1]);
  } else if (darkmode == 3) {
    stroke(palettes[0][1]);
  } else if (darkmode == 4) {
    stroke(palettes[backmix][1]);
  }
  //hatching background
  rectMode(CENTER);
  let frame = random([100, 100, 100, 100, 50, 150, 100, 175, 100, 75]);

  //density of hatching lines
  let spacingx = random([1, 2, 3, 4, 5, 10, 2, 2]);
  let spacingy = random([2, 3, 4, 5, spacingx, spacingx,2, 3, 4, 5, spacingx, spacingx, 20]);

  hatchcoverage = random([1,1,1,1,2])

  if (hatchcoverage == 1) {
    hatchamt = 0.6
  } else {
    hatchamt = 0.45
  }

  //hatch style
  weightofhatchmarks = 1; //random([1,2])
  hatchstyle =  random(["ybased", "noisebased", "xbased"]);
  linetype = random([
    "diagonalhatch",
    "verticalhatch",
    "horiz",
    "diagonalhatch",
    "diagonalhatch",
  ]);

  if (frame < 75) {
    foregroundtype = 2;
  } else {
    foregroundtype = random([1, 2, 2, 2, 2]);
  }

  if (foregroundtype == 1) {
    //HILLS AND TREES
    push();
    morelines = 15;
    //frame = -25;
    xfreqofpeak = 5;
    incr = random([0.008, 0.002]);
    peakheight = 200;
    groundwave = 400;
    randangle = random(100);
    numhills = 25;
    distbtwnhills = 1;

    let loops = 5;
    while (loops--) {
      if (darkmode == 1) {
        //darkmode
        fill(palettes[0][0]);
      } else if (darkmode == 2) {
        //regular
        fill(palettes[1][0]);
      } else if (darkmode == 3) {
        //dark + gold-lined clouds
        fill(palettes[0][0]);
      } else if (darkmode == 4) {
        //dark + gold-lined clouds
        fill(palettes[backmix][0]);
      }

      noFill();
      if (frame < 5) {
        ground = 600 + random(-1, 1);
      } else {
        ground = 425 + random(-1, 1);
      }

      for (b = ground; b < ground + 500; b += 0.5) {
        if (b < ground + 1) {
          if (darkmode == 1) {
            stroke(palettes[0][1]);
          } else if (darkmode == 2) {
            stroke(palettes[1][1]);
          } else if (darkmode == 3) {
            stroke(palettes[0][1]);
          } else if (darkmode == 4) {
            stroke(palettes[backmix][1]);
          }
        } else {
          if (darkmode == 1) {
            stroke(palettes[0][0]);
          } else if (darkmode == 2) {
            stroke(palettes[1][0]);
          } else if (darkmode == 3) {
            stroke(palettes[0][0]);
          } else if (darkmode == 4) {
            stroke(palettes[backmix][0]);
          }
        }

        beginShape();

        for (a = frame; a < width - frame; a += xfreqofpeak) {
          //b = map(a, frame, width - frame, ground, ground + groundwave);
          heightofhash = random(random(5, 20)); //treeheight
          n = noise(a * incr, ground);

          curveVertex(a, map(n, 0, 1, b - peakheight, b + peakheight));
          if (b < ground + 1 && a > frame + 1 && a < width - frame - 15) {
            if (random(0, 1) > 0.3) {
              push();
              strokeWeight(0.5);
              treeheight = random(5, random(5, random(5, random(5, 75))));
              translate(
                a,
                map(n, 0, 1, b - peakheight, b + peakheight) -
                  treeheight -
                  treeheight / 3
              );
              drawTree(35);
              await tick();
              pop();
            }
          } else {
          }
        }
        endShape();
      }
    }
    await tick();
    pop();
  }
  //end rolling hills

  if (texture == 2) {
    metahatchtype = random([1, 1, 1, 1, 1, 2, 3]);
  } else {
    metahatchtype = random([1, 1, 1, 1, 1, 2, 3, 4]);
  }

  if (metahatchtype == 1) {
    dashsetone = random([5, 5, 5, 5, 5, 5, 5, 55]);

    colorfullines = random([1, 2, 2, 2, 2, 2, 2, 2]);

    for (let x = frame; x <= width - frame; x += spacingx) {
      for (let y = frame; y <= height - frame; y += spacingy) {
        //creating noise fields to pull from
        let incr = 0.008;
        n = noise(x * incr, y * incr);

        let incr2 = 0.004;
        n2 = noise(x * incr2, y * incr2);

        let incr3 = 0.008;
        n3 = noise(x * incr3, y * incr3);

        //two different weightings; one that fades top to bottom, and one based on the third noise field (a little patchy)
        if (hatchstyle == "ybased") {
          strokeWeight(map(y, frame, height - frame, weightofhatchmarks, 0));
        } else if (hatchstyle == "noisebased") {
          strokeWeight(map(n3, 0, 1, weightofhatchmarks, 0));
        } else if (hatchstyle == "xbased") {
          strokeWeight(map(x, frame, width - frame, weightofhatchmarks, 0));
        }

        //make those lines dashed
        drawingContext.setLineDash([random(5), random(dashsetone)]);

        if (colorfullines == 1) {
          stroke(50, 55, random([0, 55, 0, 0, 0, 0, 0, 0, 0, 0]));
        } else {
        }

        if (linetype == "verticalhatch") {
          anglex = 0;
          extralinex = 0;
          extraline = random(-15, 15);
          angley = anglex;
        } else if (linetype == "diagonalhatch") {
          anglex = random(spacingx / 4, spacingx * 4);
          extralinex = random(-15, 15);
          extraline = extralinex;
          angley = anglex;
        } else if (linetype == "horiz") {
          anglex = random(spacingx / 4, spacingx * 4);
          extralinex = random(-15, 15);
          extraline = 0;
          angley = 0;
        }

        //this creates patches of no hatching lines so it feels 'foggy' and 'sketch-like'
        if (n > hatchamt) {
        } else {
          line(x, y, x + anglex + extralinex, y - angley - extraline);
        }

        if (n2 > 0.4) {
        } else {
          line(x, y, x + anglex + extralinex, y + angley + extraline);
        }
      }
    }
  } else if (metahatchtype == 2) {
    dashedlines = random([0, 0, 5, 25]);
    dashedlinesmessy = random([5, 55]);
    spacingx = random([25, 25, 25, 25, 150]);
    spacingy = 5;
    incr = random([0.001, 0.003, 0.008, 0.001, 0.003]);

    for (let y = frame; y <= height - frame; y += spacingy) {
      beginShape();
      noFill();
      for (let x = frame - 25; x <= width - frame + 25; x += spacingx) {
        drawingContext.setLineDash([
          random(dashedlinesmessy),
          random(dashedlines),
        ]);
        n = noise(x * incr, y * incr);
        strokeWeight(map(n, 0, 1, 1, 0));
        curveVertex(x, y + map(n, 0, 1, -50, 50));
      }
      endShape();
    }

    spacingx = 5;
    spacingy = 25;

    for (let x = frame; x <= width - frame; x += spacingx) {
      beginShape();
      noFill();
      for (let y = frame; y <= height - frame + 25; y += spacingy) {
        drawingContext.setLineDash([
          random(dashedlinesmessy),
          random(dashedlines),
        ]);
        n = noise(x * incr, y * incr);
        strokeWeight(map(n, 0, 1, 1, 0));
        curveVertex(x + map(n, 0, 1, -50, 50), y);
      }
      endShape();
    }
  } else if (metahatchtype == 3) {
    let spacing = random([0.5, 4, 0.5, 0.5, 0.5, 0.5]);
    let size = spacing;
    spacbtwnrow1 = random([10, 25, 10]);
    spacbtwnrow2 = random([10, 25, 10]);

    noisewiggle = 5;
    let incr = random([0.1, 0.01, 0.01, 0.01, 0.008, 0.01]);

    for (let x = frame; x <= width - frame; x += spacing) {
      for (let y = frame; y <= height - frame; y += spacing * spacbtwnrow1) {
        n = noise(x * incr, y * incr);

        if (n > 0.4) {
          point(x, y + map(n, 0, 1, -noisewiggle, noisewiggle));
        }
        if (n > 0.6) {
          fill("black");
          rect(
            x,
            y + map(n, 0, 1, -noisewiggle, noisewiggle),
            4,
            map(n, 0, 1, 0, 3)
          );
        }
      }
    }

    for (let x = frame; x <= width - frame; x += spacing * spacbtwnrow2) {
      for (let y = frame; y <= height - frame; y += spacing) {
        n = noise(x * incr, y * incr);

        if (n > 0.5) {
          point(x + map(n, 0, 1, -noisewiggle, noisewiggle), y);
        } else {
          point(x + map(n, 0, 1, -noisewiggle, noisewiggle), y);
        }
      }
    }
  } else if (metahatchtype == 4) {
    push();
    incr = 0.003;
    wiggle = 10;
    xfreq = 1;
    weightset = 2;
    weightsetstart = random([-1, 1]);

    fill(random(200, 220), 55, random([25, 55, 75]), 55);
    stroke("black");

    beginShape();
    for (let j = width - frame; j >= frame; j -= xfreq) {
      n = noise(j * incr, frame);
      strokeWeight(map(n, 0, 1, weightsetstart, weightset));
      curveVertex(j, frame + map(n, 0, 1, -wiggle, wiggle));
    }

    for (let j = frame; j <= height - frame; j += xfreq) {
      n = noise(frame, j * incr);
      strokeWeight(map(n, 0, 1, weightsetstart, weightset));

      curveVertex(frame + map(n, 0, 1, -wiggle, wiggle), j);
    }

    for (let j = frame; j <= width - frame; j += xfreq) {
      n = noise(j * incr, height - frame);
      strokeWeight(map(n, 0, 1, weightsetstart, weightset));

      curveVertex(j, height - frame + map(n, 0, 1, -wiggle, wiggle));
    }

    for (let j = height - frame; j >= frame; j -= xfreq) {
      n = noise(width - frame, j * incr);
      strokeWeight(map(n, 0, 1, weightsetstart, weightset));

      curveVertex(width - frame + map(n, 0, 1, -wiggle, wiggle), j);
    }

    endShape(CLOSE);

    await tick();
    pop();
  }
  await tick();
  pop();

  //sun
  if (sun == 1) {
    if (darkmode == 1) {
      stroke(palettes[0][1]);
    } else if (darkmode == 2) {
      stroke(palettes[1][1]);
    } else if (darkmode == 3) {
      stroke(palettes[0][1]);
    } else if (darkmode == 4) {
      stroke(palettes[backmix][1]);
    }
    push();
    x = random(25, width - 25);
    y = random(25, 200);
    sunsize = random([10, 20, 40, 60]);
    translate(x, y);
    push();
    fill(random(["white", "black"]));
    circle(0, 0, 15);
    await tick();
    pop();
    centerset = random(5, 10);
    for (a = 0; a < 360; a += 6) {
      push();
      sizeofcenter = random(centerset, centerset + 2);
      rotate(map(a, 0, 360, 0, 360));
      //drawingContext.setLineDash([random(25), random(3)]);
      line(0, sizeofcenter, 0, random(sizeofcenter, sizeofcenter + sunsize));
      await tick();
      pop();
    }
    await tick();
    pop();
  }

  //setting a foreground for the trees and having it fade as we go down
  //ground line
  if (foregroundtype == 2) {
    push();
    // stroke("black")
    if (darkmode == 1) {
      stroke(palettes[0][1]);
    } else if (darkmode == 2) {
      stroke(palettes[1][1]);
    } else if (darkmode == 3) {
      stroke(palettes[0][1]);
    } else if (darkmode == 4) {
      stroke(palettes[backmix][1]);
    }
    for (b = 0; b < 20; b += 2) {
      strokeWeight(map(b, 0, 15, 1.5, -1));
      line(
        frame,
        height - frame + b - 3,
        width - frame,
        height - frame + b - 3
      );
    }
    await tick();
    pop();

    //shitty, kind of plain trees that i need to re-write because i don't like them
    let leftree = treecount;
    while (leftree--) {
      if (darkmode == 1) {
        stroke(palettes[0][1]);
      } else if (darkmode == 2) {
        stroke(palettes[1][1]);
      } else if (darkmode == 3) {
        stroke(palettes[0][1]);
      } else if (darkmode == 4) {
        stroke(palettes[backmix][1]);
      }
      push();
      x = random(frame, width - frame - 10);
      treeheight = random(5, random(5, random(5, random(5, 75))));
      y = height - frame - treeheight - treeheight / 3 + random(-2, 7);
      let incr3 = 0.003;
      n = noise(x * incr3, y * incr3);

      push();
      strokeWeight(0.5);
      translate(x, y);
      drawTree(treeheight);
      await tick();
      pop();
    }
  }

  //clouds
  //i draw '75' clouds, but most of them don't appear on the screen because they are too small; but i haven't had time to adjust the parameters to fix that

  phosph = random([1, 1, 1, 1, 1, 1, 1, 1, 1, 2]);
  innercloudtexture = random([1, 1.6]);
  spacingset = random([1, 1, 1, 1, 1, 1, 1, 0.5, 1, 1, 2.1, 0.5, 1, 0.5]); //size of bubbles in cloud; 0.5 takes some time but is a cool effect
  size = spacingset;
  mixedcloudtype = random([1, 2, 2, 2, 2, 2, 2, 2, 2, 2]);
  if (darkmode == 2 || darkmode == 4) {
    blueclouds = random([1, 1, 2, 2, 2, 2, 2, 2, 2]);
  } else {
    blueclouds = 2;
  }

  bluecloudcoset = random([1, 50, 220, 220]);

  morphinside = random([1, 2, 2, 2, 2, 2, 2, 2]);
  widthsetup = random([50, 75, 100, 125, 50]);
  
  blackcloud = random([2,2,2,2,2,2,2,2,2,2,2,2,2,1])
  
  if (blackcloud == 1) {

  let cloudloopohyeas = cloudnum;
  while (cloudloopohyeas--) {
    push();

    zzx = random(-widthsetup, widthsetup);

    zzy = random(-225, 0);
    translate(zzx, zzy);

    if (mixedcloudtype == 1) {
      spacingset = random([1, 0.5, 2.1, 1, 4]); //size of bubbles in cloud; 0.5 takes some time but is a cool effect
      size = spacingset;
    }

    //both of these are actually a 'frame', so higher numbers reduce the size of the cloud
    framey = random(200, 300); //vertical frame (e.g., the cloud starts at 200 pixels down, and goes to height-200 pixels more down)
    cloudwidth = random(random(150, 400), 800); //horizontal frame

    //i don't understand how p5 randomness works; it never feels random to me; so sometimes i do this and feel silly
    //noiseSeed(random(1000));

    //give the clouds an uneven shape instead of a pyramid everytime; this just 'morphs' the frame on one side or the other (making it smaller or larger)
    framemorphl = random(0.1, 4);
    framemorphr = random(0.1, 4);

    wiggleset = random(15, 25);

    //phosphorous fireworks

    if (phosph == 1) {
      frameyset1 = framey;
      frameyset2 = height - framey;
      phosphmod = 2;
    } else {
      frameyset1 = height - framey;
      frameyset2 = framey;
      phosphmod = 4;
    }

    bluecloudcoset = random([1, 50, 220, 220]);

    for (let j = 0; j <= 2; j++) {
      for (let y = framey; y <= height - framey; y += spacingset) {
        if (morphinside == 1) {
          framemorphl = random(0.1, 4);
          framemorphr = random(0.1, 4);
        }

        framexl = map(
          y,
          framey,
          height - framey,
          cloudwidth,
          cloudwidth / framemorphl
        );
        framexr = map(
          y,
          framey,
          height - framey,
          cloudwidth,
          cloudwidth / framemorphr
        );
        for (let x = framexl; x <= width - framexr; x += spacingset) {
          let incr = 0.1;
          let incr2 = 0.2;
          let incr3 = 0.3;

          //lay down circles with a stroke (to provide the outline) then lay down another set of those same circles, but with no stroke to make it hollowish
          if (j == 0) {
            strokeWeight(random(0, 3));
            if (darkmode == 1) {
              stroke(palettes[0][1]);
            } else if (darkmode == 2) {
              stroke(palettes[1][1]);
            } else if (darkmode == 3) {
              stroke(random(["white", "white", palettes[2][1]]));
            } else if (darkmode == 4) {
              stroke(palettes[backmix][1]);
            }
          } else if (j == 1) {
            noStroke();
          }

          n = noise(x * incr, y * incr);
          n2 = noise(x * incr2, y * incr2);
          n3 = noise(x * incr2, y * incr2);

          if (blueclouds == 1) {
            fill(bluecloudcoset, 55, map(y, framey, height - framey, 99, 55));
          } else {
            if (darkmode == 1) {
              fill(palettes[0][0]);
            } else if (darkmode == 2) {
              fill(palettes[1][0]);
            } else if (darkmode == 3) {
              fill(palettes[0][0]);
              //fill(map(x,framexl,width - framexr,360,1),55,map(y,framey,height-framey,55,55))
            } else if (darkmode == 4) {
              fill(palettes[backmix][0]);
            }
          }
          
          fill("black");
          

          wigglex = map(n, 0, 1, -wiggleset, wiggleset);
          wiggley = map(
            y,
            frameyset1,
            frameyset2,
            map(n2, 0, 1, -wiggleset * phosphmod, wiggleset * phosphmod),
            map(n2, 0, 1, -5, 5)
          );
          wigglesize = map(n2, 0, 1, 1, 3);
          //this is a key thing, it controls the size of the circles and you want to make it smaller than the spacing so that there are gaps / hatches in the cloud instead of it being opaque
          size = map(n3, 0, 1, spacingset / 5, spacingset * innercloudtexture);

          push();
          translate(x, y);
          if (spacingset == 2) {
            rect(wigglex, wiggley, size * wigglesize);
          } else {
            circle(wigglex, wiggley, size * wigglesize);
          }
          pop();
        }
      }
    }
    await tick();
    pop();
  }
  
  }
    
  //end first

  let cloudloopohyeass = cloudnum;
  while (cloudloopohyeass--) {
    push();

    zzx = random(-widthsetup, widthsetup);

    zzy = random(-225, 0);
    translate(zzx, zzy);

    if (mixedcloudtype == 1) {
      spacingset = random([1, 0.5, 2.1, 4, 1]); //size of bubbles in cloud; 0.5 takes some time but is a cool effect
      size = spacingset;
    }

    //both of these are actually a 'frame', so higher numbers reduce the size of the cloud
    framey = random(200, 300); //vertical frame (e.g., the cloud starts at 200 pixels down, and goes to height-200 pixels more down)
    cloudwidth = random(random(150, 400), 800); //horizontal frame

    //i don't understand how p5 randomness works; it never feels random to me; so sometimes i do this and feel silly
    //noiseSeed(random(1000));

    //give the clouds an uneven shape instead of a pyramid everytime; this just 'morphs' the frame on one side or the other (making it smaller or larger)
    framemorphl = random(0.1, 4);
    framemorphr = random(0.1, 4);

    wiggleset = random(15, 25);

    //phosphorous fireworks

    if (phosph == 1) {
      frameyset1 = framey;
      frameyset2 = height - framey;
      phosphmod = 2;
    } else {
      frameyset1 = height - framey;
      frameyset2 = framey;
      phosphmod = 4;
    }

    bluecloudcoset = random([1, 50, 220, 220]);

    for (let j = 0; j <= 2; j++) {
      for (let y = framey; y <= height - framey; y += spacingset) {
        if (morphinside == 1) {
          framemorphl = random(0.1, 4);
          framemorphr = random(0.1, 4);
        }

        framexl = map(
          y,
          framey,
          height - framey,
          cloudwidth,
          cloudwidth / framemorphl
        );
        framexr = map(
          y,
          framey,
          height - framey,
          cloudwidth,
          cloudwidth / framemorphr
        );
        for (let x = framexl; x <= width - framexr; x += spacingset) {
          let incr = 0.1;
          let incr2 = 0.2;
          let incr3 = 0.3;

          //lay down circles with a stroke (to provide the outline) then lay down another set of those same circles, but with no stroke to make it hollowish
          if (j == 0) {
            strokeWeight(random(0, 3));
            if (darkmode == 1) {
              stroke(palettes[0][1]);
            } else if (darkmode == 2) {
              stroke(palettes[1][1]);
            } else if (darkmode == 3) {
              stroke(random(["white", "white", palettes[2][1]]));
            } else if (darkmode == 4) {
              stroke(palettes[backmix][1]);
            }
          } else if (j == 1) {
            noStroke();
          }

          n = noise(x * incr, y * incr);
          n2 = noise(x * incr2, y * incr2);
          n3 = noise(x * incr2, y * incr2);

          if (blueclouds == 1) {
            fill(bluecloudcoset, 55, map(y, framey, height - framey, 99, 55));
          } else {
            if (darkmode == 1) {
              fill(palettes[0][0]);
            } else if (darkmode == 2) {
              fill(palettes[1][0]);
            } else if (darkmode == 3) {
              fill(palettes[0][0]);
              //fill(map(x,framexl,width - framexr,360,1),55,map(y,framey,height-framey,55,55))
            } else if (darkmode == 4) {
              fill(palettes[backmix][0]);
            }
          }

          wigglex = map(n, 0, 1, -wiggleset, wiggleset);
          wiggley = map(
            y,
            frameyset1,
            frameyset2,
            map(n2, 0, 1, -wiggleset * phosphmod, wiggleset * phosphmod),
            map(n2, 0, 1, -5, 5)
          );
          wigglesize = map(n2, 0, 1, 1, 3);
          //this is a key thing, it controls the size of the circles and you want to make it smaller than the spacing so that there are gaps / hatches in the cloud instead of it being opaque
          size = map(n3, 0, 1, spacingset / 5, spacingset * innercloudtexture);

          push();
          translate(x, y);
          if (spacingset == 2) {
            rect(wigglex, wiggley, size * wigglesize);
          } else {
            circle(wigglex, wiggley, size * wigglesize);
          }
          pop();
        }
      }
    }
    await tick();
    pop();
  }

  
  textureset = random([1,1,1,1,1,1,1,1,1,2])
  //texturemaker
  if (darkmode == 2 && textureset == 2) {
    texturecolor = 210
  } else {
    texturecolor = 50
  }
  //texturemaker
  if (texture == 1) {
    padfactor = 1000;
    let loops = 20000; //2000000;
    while (loops--) {
      x = random(width);
      y = random(height);
      push();
      strokeWeight(0.2);
      stroke(texturecolor, 50, random(55, 95), random(1, 15));
      noFill();
      bezier(
        random(-padfactor, width + padfactor),
        random(-padfactor, height + padfactor),
        random(-padfactor, width + padfactor),
        random(-padfactor, height + padfactor),
        random(-padfactor, width + padfactor),
        random(-padfactor, height + padfactor),
        random(-padfactor, width + padfactor),
        random(-padfactor, height + padfactor)
      );
      pop();
    }
  }
  //end

  window.renderComplete = true;
  window.postMessage("renderComplete", "*");
}

function drawTree(treeheight) {
  //treeheight = 75
  treewidth = treeheight / 3;
  treeshade = 2;
  treeshadewidth = treewidth / 3.5;
  trunkheight = treeheight / 3;

  fill("white");

  //rect(0, 0, treewidth, treeheight, 360, 360, 5, 5);
  line(treewidth / 2, 0, treewidth / 2, treeheight);

  push();
  for (var i = 0; i <= treeheight - 1; i += treeshade) {
    drawingContext.setLineDash([random(5), random(3)]);
    wigglez = 0; //map(i,0,treeheight-1,-5,0)
    wiggley = 0; //map(i,0,treeheight-1,3,0)

    line(
      treewidth / 2,
      -i + treeheight - 2,
      -treeshadewidth + wigglez + treewidth / 2,
      -i + treeheight + wiggley
    );
  }

  for (var i2 = 0; i2 <= treeheight - 1; i2 += treeshade) {
    drawingContext.setLineDash([random(5), random(3)]);
    wigglez = 0; //map(i2,0,treeheight-1,5,0)
    wiggley = 0; //map(i2,0,treeheight-1,3,0)

    line(
      treewidth / 2,
      -i2 + treeheight - 2,
      treeshadewidth + wigglez + treewidth / 2,
      -i2 + treeheight + wiggley
    );
  }
  pop();

  line(treewidth / 2, treeheight, treewidth / 2, treeheight + trunkheight);
}