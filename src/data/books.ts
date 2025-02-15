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
 hi! i'm verda. who are you? ok fine i'll tell you, but first let me say that it is actually quite difficult to describe ones self. i could start by telling you my physical characteristics but that is only a fraction of who i am and not a worthy descriptor.
 i wish i could say with certainty who i am but after a long conversation with claude where
 i input all of my characteristics, life history, dreams, education, work history, family, places i've lived, and more, it told me that i "analyze things like an anthropologist"
 anyway, i'm pretty young in years but people say i'm older inside. this is probably true, i grew up
 the eldest of 4 (this has since technically become 8). with a single father and a very young autistic brother. 
 so i've kind of been an adult since i was 12.
 my eyesight is very poor, my prescription is a -6.5 so I could not see
 until my parents realized (when I was 8) that i needed glasses. anyway, i learned to read when I was 2 because I could not see anything else.
 i was homeschooled by a religious mother until 5th grade so i've read the bible 5 times, the first of which was when i was 5. 
 revelations was my favorite. after that i went to public school, then a catholic private school, then to community college/public school.
 i made my first website in high school, it was a library website! that got me my first software engineer job for a company called the pesto group, which is
 one of the many reasons i decided to skip college. 
 chalking up my life to this point, i am heavily favored by the universe because i more or less am not that great at openings.
 i'm constantly experimenting to see how far my luck will take me and how i can extend it to others.
`,
      color: BOOK_COLORS[5]
    },
    {
      id: "200-2",
      title: "Passions, Past and Present",
      content: `# Everything I have ever been passionate about
From a young age I loved to read. After entering school in the 5th grade I became even more attached to books and obsessed with getting good at school.
I also became somewhat obsessed with making friends which I did a very bad job at. In middle school I really liked spanish, I would help a lot of people with their spanish homework
and at one point could hold conversations. I also started an engineering club in middle school where we designed 3d models with tinkercad and 3d printed them.
It began because I 3d printed fidget spinners and sold them to my friends. I became quite chubby in middle school and at one point was embarrassed because
my two best friends could do cartwheels and I could not. I went on to wear a hole in the lawn teaching myself to cartwheel, went on to achieve a round-off, back 
and front walkover and my right, left, and middle splits. (to be continued) `,
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
   met in the fifth grade. my first online -> real friend. after a long discussion on musically.com
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
   the name speaks for itsself here, inventor of the laser bong, currently resides in san francisco in which
   he was born and raised.
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
      title: "How to get places cheaper",
      content: `# Uber and Lyft
Pit them against each other.`,
      color: BOOK_COLORS[0]
    },
    {
      id: "600-2",
      title: "Run Clubs",
      content: `# Efficient Form of Health Enhancement
Outside time, social interaction, and physical activity. The ultimate hack for health. Important factor here is the people you are with, if they are boring and don't entertain you, the effectiveness is diminished a bit.`,
      color: BOOK_COLORS[1]
    },
    {
      id: "600-3",
      title: "Ask and Ye Shall Recieve",
      content: `# Ask questions, get answers
I'm sure you've heard the "ask for 10% off" experiment where people who arbitrarily ask for 10% off at a coffee shop are 8/10 times rewarded. Try it, it works and if it doesn't, the lesson is quite good. Sample more random distributions.`,
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