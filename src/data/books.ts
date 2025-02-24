export interface Book {
  id: string;
  title: string;
  content: string;
  color: string;
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
Why you should get a 3d printer:
- You can make anything
- You can learn how to make anything
- You can save money
- You can make money
- You can learn how to make money
- You can save the environment
- You can learn how to save the environment
- You can learn how to do anything
- You can do anything`,
      color: BOOK_COLORS[14]
    }
  ],
  "100": [
    {
      id: "100-1",
      title: "The Nature Of Humanity",
      content: `# Do our characteristics hint at a higher purpose?
To be capable of observing, analyzing, and changing our environments such that new systems can exist as a direct result of our reasoning feels like a bug.
Nowhere else is this present in nature to the extent at which we exhibit this.
Does this mean that we are meant to be beings of entropy and creation?
Our lifespans limit our ability to naturally evolve our systems and our lossy documentation is really the only way of passing information.
Back to my original question, the only way I have found to methodically approach any kind of "purpose" is looking at all the things I am capable of and wondering why exactly I am.
This has lead me to some interesting questions that I will explore another time when it is not 1 am.`,
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
      title: "who am i?",
      content: `#
 hi! i'm verda. who are you? 
 
 ok fine i'll tell you, kindly note that this is not an accurate representation of who i am
 
 for all intents and purposes, i am a boundless being of light and energy. i was legally blind until my parents realized (when I was 8) that i needed glasses. i learned to read when I was 2 because I could only see very close up.
 i was homeschooled in the IFB church until the 5th grade, big fan of the KJV bible. i've bounced between public school, catholic private school, and a shortlived attempt at a mechatronics degree at a community college. 
 i made my first website in high school, it was a library website! after that I got my first software engineer job at a consultancy. i have since went on to build 3d printers, do a variety of sidequests, and as of feb 24th 2025 at 3:53am
 when i am writing this, i live between a san francisco hacker house i started called prototype house and a robotics company in palo alto called kscale labs. 
`,
      color: BOOK_COLORS[5]
    },
    {
      id: "200-2",
      title: "early education",
      content: `# on getting my young soul smashed and learning social dynamics late
on my first day of school, I was 10 years old. my only objective was finding book-like kindred spirits (see anne and diane from green gables/nancy and detective friends).
alas, this was not to be. only after two years, i made two good friends who attended a school across the town from me. one day i was embarrassed because
they could do cartwheels and I could not. i resolved to cartwheel, round-off, back 
and front walkover and do right, left, and middle splits.
this incurred the wrath of my overstretched father who exclaimed in outrage at the sight of
a brown dirt patch in his otherwise luscious long green grass. however, i think it made him proud. he has often cited "the time i wore a hole in the
grass learning to cartwheel" as evidence of tenacity.
i really enjoyed spanish class because to learn was to speak.
in an otherwise sterile and silent school day of passive consumption, it was refreshing.
after learning 3d modeling, i began an engineering club in middle school. we designed things with tinkercad and 3d printed them.
i ended up 3d printed a lot of fidget spinners, selling them to people. 

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
      content: `# I'm experimenting with substances and their effects on the body. this will be quite boring until i turn 21
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
      content: `# Uber and Lyft
Pit them against each other.`,
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
      content: `# Ask questions, get answers
      the "ask for 10% off" experiment where people who arbitrarily ask for 10% off at a coffee shop are 8/10 times rewarded comes to mind. try it, it usually works and if it doesn't, the lesson is quite good. Sample more random distributions.`,
      color: BOOK_COLORS[2]
    }
  ],
  "700": [
    {
      id: "700-1",
      title: "The art of the system",
      content: `# what i see in systems
the saying goes "art imitates life" but when you think of life as a bunch of tiny systems, you start to see how
every system is an art and art its self is a system.`,
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