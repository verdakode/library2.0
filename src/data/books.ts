export interface Book {
  id: string;
  title: string;
  content: string;
  color: string;
  lastEdited?: string; // ISO date string of when the book was last edited
}

export interface ShelfBooks {
  [shelfId: string]: Book[];
}

// Vibrant, rich colors for books
export const BOOK_COLORS = [
  '#8B0000', // Dark Red
  '#006400', // Dark Green
  '#00008B', // Dark Blue
  '#4B0082', // Indigo
  '#800080', // Purple
  '#8B4513', // Saddle Brown
  '#556B2F', // Dark Olive Green
  '#2F4F4F', // Dark Slate Gray
  '#191970', // Midnight Blue
  '#8B008B', // Dark Magenta
  '#CD853F', // Peru
  '#DAA520', // Goldenrod
  '#B8860B', // Dark Goldenrod
  '#D2691E', // Chocolate
  '#A0522D', // Sienna
] as const;

// Book data organized by shelf
export const SHELF_BOOKS: ShelfBooks = {
  "000": [
    {
      id: "000-1",
      title: "My Tools",
      content: `# What I use to get things done
- I-Term
- Tmux
- Neovim
- Zed
- Cloudflare
- Render
- Bambu A1
- Onshape
- Claude
- will write more later its 1 am lol`,
      color: BOOK_COLORS[13]
    },
    {
      id: "000-2",
      title: "3D Printing knowledge dump",
      content: `# the everything machines
      - FDM
      have had most experience with trad 3axis gantry printers. I've had 4 now, my first in 6th grade was a monoprice, I've had two ender 3s and one bambu A1. I used to work for a company that built a high throughput plastic FDM printer. The coolest thing here was the novel belting mechanism that allowed us to maximize G's out of relatively shitty and inexpensive actuators, this was Matveys invention. I was more on the software side and built out the user interface for this machine using klipper, mainsail, and crowsnest. After I left this company I thought it would be cool if there was more of a 3d printed goods economy and so I setup a website to enable hyperlocal manufacturing. Ran out of steam here so will maybe pick this project up again someday. Led me to the realization that robotics is one of the most interesting applications of 3d printing so then I started working at a humanoid robot company with a garage printer farm.`,
      color: BOOK_COLORS[14]
    }
  ],
  "100": [
    {
      id: "100-1",
      title: "The Nature Of Humanity",
      content: `# What does it mean that we have the characteristics that we do?
To be capable of observing, analyzing, and intentionally changing that which naturally occurs is odd. Even more so that we enable the existance of many other strange entities or "memes" that do not exist in nature. I love love love the game little alchemy, and more generally the concepts of alchemy because I think it is one of the best ways to understand this kind of *fumbling around in the dark* approach conscious matter takes to transforming other matter. Reading the book stuff matters in like 8th grade started this train of thought for me I think because there was so much latent space of transformations that people just stumbled through, like aerogel! Everyone thought removing the liquid from a gel would collapse the structure because in nature this is true. Except if you understand the forces governing this, you can reason about removing the liquid-gas interface causing collapse.
Humanity is very extreme in the trait of randomly intervening in natural processes.
Which is actually this phenomena of selecting and stabilizing low-entropy configurations.
Entropy is such a strange word, one that I'm sure I don't quite know enough about and is probably like 5 words in a trenchcoat depending on the context in which it is used. But here I would define it as the degree to which energy has been spread out into less usable forms.
Anyway we stabilize a bunch of low entropy configurations and pass them down since our lifespans limit our ability to naturally evolve our systems. Our lossy documentation is really the only way of transferring these low entropy states between generations, civilization becoming this eternal death coping mechanism.
So given all this, the the only way I have found to methodically approach any kind of "purpose" or "discover who I am" is by looking at all the things I am capable of and using those to do a new thing. A new thing here is defined as a previously unrealized but physically possible configuration of matter and energy. It follows that this methodology is also good for the plot but occasionally appear externally to be a very "stupid" and "convoluted" way of doing things`,
      color: BOOK_COLORS[3]
    },
    {
      id: "100-2",
      title: "Growth Analysis",
      content: `# Personal Development Analysis
Systematic review of growth trajectories and milestone achievements.`,
      color: BOOK_COLORS[4]
    }
  ],
  "200": [
    {
      id: "200-1",
      title: "important context on me",
      content: `#
 hi! i'm verda!

 for all intents and purposes, i am a instance of the universe. going a bit deeper than that, I am a temple of flesh predicted by my brain which in turn was predicted by someone elses brain.
 so here are a few fun facts
 - i have horrible nearsightedness (prescription is -6) until my parents realized when I was 10 that i needed glasses. i learned to read when I was 2 because I could only see very close up. my friends say words ngmi and I simulataneously agree with this sentiment but remain bullish on words.
 - i was homeschooled in the IFB church until the 5th grade, big fan of the KJV bible. i've bounced between public school, catholic private school, and my senior year did a stint at community college doing mechatronics.
 - i made my first website in high school, it was a library website! after that I got my first software engineer job at a software consultancy called the pesto group which led me to pursue a craft rather than continuing to college and eventually to move to sf.
 - when i am writing this, i live in a san francisco group house i started called prototype sf. which you can read about online as https://prototypesf.org
`,
      color: BOOK_COLORS[5]
    },
    {
      id: "200-2",
      title: "early education",
      content: `# i have opinions here

`,
      color: BOOK_COLORS[6]
    },
    {
      id: "200-2",
      title: "philosophy of schedule",
      content: `# how to structure seconds, minutes, hours, days, years, and decades
      our brains are continuously updating our internal models of the world in order to seek out the next tidbit of information needed to continue updating and leveling up. this is known as the free energy principle. where systems evolve over time by minimizing a quantity known as "free energy" to reduce surprise or uncertainty. The FEP is theorized to apply to all timescales, from milliseconds of perception, to evolutionary timescales. i theorize that optimizing your life for reducing uncertainty or surprise is very useful in many ways. therefore I structure my days as follows.
      - 6-7am wake up, waking up early allows you more time conscious than the rest of the world, giving you a head start on perception and that good old internal model
      - 6/7-8 water, stretch, maybe walk, breakfast, check messages, probably drink caffiene
      - 8-lunch, slowly work into the daily rhythm of maintaining various projects and relationships
      - lunch, this should usually happen with other humans, ideally you spend most of the day around other humans
      - rest of day until bed, varies between working and admin tasks. eat a healthy dinner, get exercise if not had yet.
      - bed, 10/11pm, wind down by reading/writing/stretching or planning for early morning tasks next day

      - all of this is purposefully very flexible as to allow me to deal with the inevitably most important thing that must be done each day in service of *the arc*
      - time is a projection of the mind, treat it as such, there is only the present and you have access to your optimal policy at all times. identifying high leverage actions is key.
`,
      color: BOOK_COLORS[6]
    }
  ],
  "300": [
    {
      id: "300-1",
      title: "Guest Book",
      content: `# Sign Here to be FOREVER REMEMBERED`,
      color: BOOK_COLORS[7]
    },
    {
      id: "300-2",
      title: "Hall of Fame",
      content: `# people who stand out to me and why
- Russ Taber
   at a library in grand rapids for the first area wide 3d printing meetup, i immediately noticed the tubing
   he was carrying and proceeded to pepper him with questions. upon further investigation, he was in the process
   of creating a ceremic 3d printer. after discussing the danger klipper installations and various ceremic flow
   rate issues, he showed me pictures of all the 3d printers he had and a flower lamp he designed. he ended up
   giving me a kit to put together the flower lamp and he has been my favorite grand rapids friend since. if you are curious,
   you can find him at idig3d.com or on any social media @idig3d.
- Rayleeana Hayward
   my first online -> real friend. after a long discussion on musically.com
   we discovered we lived nearby and proceeded to meet at a bagel shop nearby to discuss various schemes
  regarding the opposite gender. 
- Sasha Lišková 
   met at a run club in Grand Rapids, MI, inventor of transpapers, triathlete, and a very good friend.
   most notably has a very good sense of humor. took me on a 30 mile bike ride where i rode a walkmart bike
   and they patiently rode slowly,
- Kevin Knack
   my middle school science teacher, got me my first 3d printer and taught me tinkercad. also was the advisor
   for my first engineering club.
- Aaron Venema
   coworker from my first software engineer job. lived in china for a while, picked up ruby on rails very
   thoroughly very fast. background in civil engineering. went on an insane month long bike ride. is
   the creator of very intricate gaming systems.
- Gabriella Rice
   running best friend. straight forward no bullshit asian woman. my adult inspiration and motivator to run
   my first half marathon. could not have done it without her.
- Stoney Stark
   inventor of the laser bong and the portal lighter 
   (to be continued)`,
      color: BOOK_COLORS[8]
    }
  ],
  "400": [
    {
      id: "400-1",
      title: "Why Does Everyone Use Lowercase Now?!",
      content: `# human authentication in the age of artificially generated content
honestly thats it, i'll write something more later.`,
      color: BOOK_COLORS[9]
    },
    {
      id: "400-2",
      title: "New Words",
      content: `# inspired by "gaslighting"
My new favorite thing is to look for oddly specific things that do not have words yet and name them.
There are way too many unnamed things that we do not talk about because they simply do not have names.
Please contact me if you have discovered new words lately, thank you.`,
      color: BOOK_COLORS[10]
    }
  ],
  "500": [
    {
      id: "500-1",
      title: "Tracking",
      content: `# I'm experimenting with substances and their effects on my mind and body. this will be quite boring until i turn 21
- Coffee
   been drinking since the 5th grade, feel much more focused and energized when consumed.
   yet i fear this is a bug and not a feature. gives me tunnel vision.
- Green tea
   feels more calm but similar problems to above,
- *undisclosed*
   i've only tried it once but it caused me to stand at the top of russian hill and
   know that everything you see around you was made by people no smarter than you.`,
      color: BOOK_COLORS[11]
    },
    {
      id: "500-2",
      title: "Social Science",
      content: `# Cultural Documentation
This will eventually split into multiple books but here I will list my observations of various social
dynamics and phenomena.`,
      color: BOOK_COLORS[12]
    }
  ],
  "600": [
    {
      id: "600-1",
      title: "the strangeties of transport",
      content: `# `,
      color: BOOK_COLORS[0]
    },
    {
      id: "600-2",
      title: "truly effective acceleration",
      content: `# running is efficient
Outside time, social interaction, and physical activity. The ultimate hack for health. Important factor here is the people you are with, if they are boring and don't entertain you, the effect diminishes.`,
      color: BOOK_COLORS[1]
    },
    {
      id: "600-3",
      title: "Ask and Ye Shall Recieve",
      content: `# Ask questions, get answers`,
      color: BOOK_COLORS[2]
    }
  ],
  "700": [
    {
      id: "700-1",
      title: "Meow",
      content: `# meeeeowwww`,
      color: BOOK_COLORS[0]
    },
    {
      id: "700-2",
      title: "collection #1",
      content: `# things i like
- call 415-300-1515
- duuuuump.site
- noisebridge.net`,
      color: BOOK_COLORS[1]
    }
  ],
  "800": [
    {
      id: "800-1",
      title: "Books inside of books",
      content: `# all consuming 10/10 reading list
 - 20,000 Leagues Under The Sea, Around The World In 80 Days, anything by Jules Verne
 - Esther (book of the bible)
 - Grimms Fairy Tales
 - Aasops Fables
 - The Diamond Age
 - The Hunger Games
 - The Fountainhead
 - The Pilgrims Progress
 - Caraval
 - A Winters Promise
 - Stuff Matters
 - Humble Pi
 - The Glass Castle
 - Memoirs Of A Geisha
 (i'm going to probably separate this into genres soon)`,
      color: BOOK_COLORS[2]
    },
    {
      id: "800-2",
      title: "Book reviews",
      content: `# My reviews of a few books
i hate writing reviews but i'll do it for the sake of the books.`,
      color: BOOK_COLORS[3]
    },
    {
      id: "800-3",
      title: "Books I want someone to write",
      content: `# wishlist
      - a book about a universe made up of planes where everyone is 2d`,
      color: BOOK_COLORS[4]
    }
  ],
  "900": [
    {
      id: "900-1",
      title: "Interesting Historical Tidbits",
      content: `# probably not going to repeat its self right
were the amazons real?`,
      color: BOOK_COLORS[5]
    },
    {
      id: "900-2",
      title: "First Hand History",
      content: `# this is my personal history and first hand perspective thus far
this will be about my personal life history and the events i have experienced `,
      color: BOOK_COLORS[6]
    }
  ]
};

// Helper function to get random book color
export const getRandomBookColor = () => {
  return BOOK_COLORS[Math.floor(Math.random() * BOOK_COLORS.length)];
}; 
