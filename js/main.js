/* ========================================
   NAVBAR SCROLL EFFECT
======================================== */
const navbar = document.querySelector(".navbar");
if (navbar) {
    window.addEventListener("scroll", () => navbar.classList.toggle("scrolled", window.scrollY > 50));
}

/* ========================================
   THEME TOGGLE
======================================== */
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
    const savedTheme = localStorage.getItem("piyush-theme");
    const setThemeButton = () => {
        const light = document.body.classList.contains("light-mode");
        themeToggle.textContent = light ? "☾" : "☼";
        themeToggle.setAttribute("aria-label", light ? "Switch to dark mode" : "Switch to light mode");
    };
    document.body.classList.toggle("light-mode", savedTheme === "light");
    setThemeButton();
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        const light = document.body.classList.contains("light-mode");
        localStorage.setItem("piyush-theme", light ? "light" : "dark");
        setThemeButton();
    });
}

/* ========================================
   SCROLL REVEAL
======================================== */
const revealElements = document.querySelectorAll(
    ".section-label, .about-intro, .about-details, .about-traits, .work-heading, .project, .work-footer, " +
    ".experience-heading, .experience-item, .experience-visual, .contact-heading, .contact-details, .footer"
);
revealElements.forEach((element) => element.classList.add("reveal"));
if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    revealElements.forEach((element) => revealObserver.observe(element));
} else {
    revealElements.forEach((element) => element.classList.add("visible"));
}

/* ========================================
   ACTIVE NAVIGATION
======================================== */
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");
if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const id = entry.target.getAttribute("id");
            navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${id}`));
        });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });
    sections.forEach((section) => sectionObserver.observe(section));
}

/* ========================================
   SHOWREEL MODAL
======================================== */
const showreelButton = document.getElementById("showreelButton");
const showreelModal = document.getElementById("showreelModal");
const showreelClose = document.getElementById("showreelClose");
const showreelVideo = document.getElementById("showreelVideo");
if (showreelButton && showreelModal && showreelVideo) {
    const closeShowreel = () => {
        showreelVideo.pause();
        showreelVideo.currentTime = 0;
        showreelModal.close();
    };
    showreelButton.addEventListener("click", () => {
        showreelModal.showModal();
        showreelVideo.currentTime = 0;
        const playPromise = showreelVideo.play();
        if (playPromise !== undefined) playPromise.catch((error) => console.log("Showreel autoplay was blocked:", error));
    });
    if (showreelClose) showreelClose.addEventListener("click", closeShowreel);
    showreelModal.addEventListener("click", (event) => {
        if (event.target === showreelModal) closeShowreel();
    });
    showreelModal.addEventListener("close", () => {
        showreelVideo.pause();
        showreelVideo.currentTime = 0;
    });
}

/* ========================================
   PROJECT MODAL ELEMENTS
======================================== */
const projectModal = document.getElementById("projectModal");
const projectModalClose = document.getElementById("projectModalClose");
const projectModalTitle = document.getElementById("projectModalTitle");
const projectModalDescription = document.getElementById("projectModalDescription");
const projectModalGallery = document.getElementById("projectModalGallery");
const projectModalStory = document.getElementById("projectModalStory");

/* ========================================
   PROJECT DATA
======================================== */
const projectData = {
    "red-reaper": {
        title: "RED REAPER",
        description: "A hard-surface vehicle project focused on 3D modeling, detailed forms, material definition, and presentation.",
        images: [
            { src: "assets/projects/red-reaper.jpg", caption: "Final Vehicle Presentation" },
            { src: "assets/projects/details/red-reaper-02.jpg", caption: "Modeling Details" },
            { src: "assets/projects/details/red-reaper-03.jpg", caption: "Materials and Textures" }
        ]
    },
    "awm": {
        title: "AWM SNIPER RIFLE",
        description: "A hard-surface modeling project exploring mechanical forms, component detailing, and PBR presentation.",
        images: [
            { src: "assets/projects/awm.jpg", caption: "Final Model" },
            { src: "assets/projects/details/awm-02.jpg", caption: "Modeling Details" },
            { src: "assets/projects/details/awm-03.jpg", caption: "Material and Surface Details" }
        ]
    },
    "viking": {
        title: "VIKING",
        description: "A character project focused on sculpting, surface detail, and material development.",
        images: [
            { src: "assets/projects/viking.jpg", caption: "Character Presentation" },
            { src: "assets/projects/details/viking-02.jpg", caption: "Sculpting Details" },
            { src: "assets/projects/details/viking-03.jpg", caption: "Texture Details" }
        ]
    },
    "robot": {
        title: "FUTURISTIC ROBOT",
        description: "A futuristic hard-surface character study built around mechanical components, modeling detail, and a distinctive visual design.",
        images: [
            { src: "assets/projects/futuristic-robot.jpg", caption: "Robot Presentation" },
            { src: "assets/projects/details/robot-02.jpg", caption: "Mechanical Details" },
            { src: "assets/projects/details/robot-03.jpg", caption: "Modeling and Materials" }
        ]
    },
    "donut": {
        title: "DONUT",
        description: "A 3D study focused on texturing, lighting, materials, and final rendering.",
        images: [
            { src: "assets/projects/donut.jpg", caption: "Final Render" },
            // { src: "assets/projects/details/donut-02.jpg", caption: "Material Details" },
            // { src: "assets/projects/details/donut-03.jpg", caption: "Lighting Study" }
        ]
    },
    "fan": {
        title: "FAN",
        description: "A product-modeling exercise focused on shape accuracy, clean geometry, and product presentation.",
        images: [
            { src: "assets/projects/fan.jpg", caption: "Final Model" },
            // { src: "assets/projects/details/fan-02.jpg", caption: "Modeling Details" },
            // { src: "assets/projects/details/fan-03.jpg", caption: "Additional View" }
        ]
    },
    "controller": {
        title: "CONTROLLER",
        description: "A product-design project exploring ergonomic forms, 3D modeling, and preparation for 3D printing.",
        images: [
            { src: "assets/projects/controller.jpg", caption: "Final Product" },
            // { src: "assets/projects/details/controller-02.jpg", caption: "Design Details" },
            // { src: "assets/projects/details/controller-03.jpg", caption: "3D Printing Preparation" }
        ]
    },
    "male-torso": {
        title: "MALE TORSO WITH PROP",
        description: "A timed organic modeling exercise focused on anatomy, proportions, sculpting, and a horned helmet inspired by Norse mythology.",
        images: [{ src: "assets/projects/male-torso.jpg", caption: "Torso and Helmet" }]
    },
    "jug-lighting": {
        title: "THREE-POINT LIGHTING",
        description: "A product visualization study exploring material definition, reflections, and three-point lighting to create a clean, realistic render.",
        images: [{ src: "assets/projects/jug-lighting.jpg", caption: "Final Product Render" }]
    },
    "rust-reminiscence": {
        title: "RUST & REMINISCENCE",
        description: "A texturing project exploring aged surfaces, rust, dirt, edge wear, and physically based rendering materials.",
        images: [{ src: "assets/projects/rust-reminiscence.jpg", caption: "Weathered Surface Study" }]
    },
    "golden-horizon": {
        title: "WHISPERS OF THE GOLDEN HORIZON",
        description: "An environment project combining UV mapping, PBR texturing, material wear, and warm cinematic lighting.",
        images: [{ src: "assets/projects/golden-horizon.jpg", caption: "Environment Render" }]
    },
    "particle-simulation": {
        title: "PARTICLE SIMULATION",
        description: "A Blender dynamics study using particle systems, force fields, collisions, glass materials, and lighting.",
        images: [{ src: "assets/projects/particle-simulation.jpg", caption: "Particle Dynamics" }]
    },
    "ocean-simulation": {
        title: "OCEAN SIMULATION",
        description: "A fluid simulation exploring ocean motion, shading, reflections, lighting, and cinematic environmental presentation.",
        images: [{ src: "assets/projects/ocean-simulation.jpg", caption: "Fluid Simulation" }]
    },
    "organic-rigging": {
        title: "ORGANIC RIGGING",
        description: "A character-rigging workflow involving joint structures, controllers, skinning, weight painting, and deformation refinement.",
        images: [{ src: "assets/projects/organic-rigging.jpg", caption: "Character Rig" }]
    },
    "mechanical-rigging": {
        title: "MECHANICAL ARM RIGGING",
        description: "A hard-surface rigging exercise using joint hierarchies, pivot placement, constraints, and IK/FK controls.",
        images: [{ src: "assets/projects/mechanical-rigging.jpg", caption: "Inorganic Rig" }]
    },
    "car-rigging": {
        title: "CAR RIGGING",
        description: "A vehicle-rigging project with controls for the body, wheels, suspension, and additional mechanical details.",
        images: [{ src: "assets/projects/car-rigging.jpg", caption: "Vehicle Rig" }]
    },
    "platformer": {
        title: "2D PLATFORMER",
        description: "A Unity game-design project exploring sprite sheets, level construction, scene setup, and basic gameplay mechanics.",
        images: [{ src: "assets/projects/platformer.jpg", caption: "Game Design" }]
    },
    "3d-printing": {
        title: "3D PRINTING",
        description: "A production-preparation workflow involving Maya modeling, ZBrush mesh refinement, watertight geometry, and print preparation.",
        images: [{ src: "assets/projects/3d-printing.jpg", caption: "Print-Ready Model" }]
    },
    "walk-cycle": {
        title: "WALK CYCLE",
        description: "A 3D animation exercise focused on key poses, timing, spacing, weight distribution, and foot placement.",
        images: [{ src: "assets/projects/walk-cycle.jpg", caption: "Character Walk Cycle" }]
    },
    "sword-animation": {
        title: "SWORD ANIMATION",
        description: "A 3D animation study using key poses, breakdowns, and in-between frames to develop clear, believable movement.",
        images: [{ src: "assets/projects/sword-animation.jpg", caption: "Animation Study" }]
    },
    "2d-animation": {
        title: "2D ANIMATION",
        description: "A character-animation exercise exploring timing, keyframes, facial expressions, staging, and visual storytelling.",
        images: [{ src: "assets/projects/2d-animation.jpg", caption: "Character Animation" }]
    },
    "photosynthesis": {
        title: "PHOTOSYNTHESIS PROJECT",
        description: "An educational animation project involving visual research, simplified illustrations, scene creation, and animated explanations.",
        images: [{ src: "assets/projects/photosynthesis.jpg", caption: "Educational Animation" }]
    },
    "stop-motion": {
        title: "STOP MOTION MOVIE",
        description: "A handcrafted animation project involving character design, physical production, frame-by-frame animation, and storytelling.",
        images: [{ src: "assets/projects/stop-motion.jpg", caption: "Stop Motion Production" }]
    },
    "papercut-portraits": {
        title: "PAPER-CUT PORTRAITS",
        description: "A paper-cutting art project using reference images, simplified templates, and precision cutting to create detailed portraits.",
        images: [{ src: "assets/projects/papercut-portraits.jpg", caption: "Paper-Cut Artwork" }]
    },
    "papercut-animation": {
        title: "PAPER-CUT ANIMATION",
        description: "A mixed-media animation project combining digitally planned motion, handcrafted paper cutouts, and frame-by-frame photography.",
        images: [{ src: "assets/projects/papercut-animation.jpg", caption: "Paper-Cut Animation" }]
    }
};

/* ========================================
   COMPLETE PROJECT DESCRIPTIONS
======================================== */
const projectDetails = {
    "red-reaper": [
        "Red Reaper is a vehicle-modelling project inspired by automotive designs I discovered while browsing Pinterest. The concept immediately caught my attention, and I wanted to recreate its distinctive appearance as a detailed 3D asset. Since the project was part of a vehicle-modelling assignment, it also provided an opportunity to strengthen my hard-surface modelling skills and explore my own creative ideas.",
        "The process began with researching Jeep models and comparing references to understand the proportions, stance, and overall silhouette. After exploring several references, I found a blueprint of the Jeep Wrangler General Lee that closely matched the design I had in mind. I used this reference to establish the primary forms, align the body and wheels, and develop the main structure before adding custom details.",
        "Throughout the project, I focused on proportion, structural accuracy, and the relationship between the vehicle's major components. The final presentation showcases the completed model alongside modelling and wireframe views, providing a closer look at the geometry and construction of the vehicle."
    ],
    "awm": [
        "The AWM Sniper Rifle project was inspired by my interest in games such as Call of Duty and BGMI, where sniping is one of my favourite playstyles. Choosing a sniper rifle for a hard-surface modelling assignment made the project personally engaging and gave me an opportunity to study a mechanically detailed object.",
        "Before modelling, I researched different sniper rifles, studied blueprints, and compared visual references. This preparation helped me understand the rifle's overall proportions and the placement of individual components. I paid particular attention to challenging elements such as the scope, barrel, bipod, and mechanical details, where even small proportion errors could affect the final appearance.",
        "I created the initial model in Blender, beginning with a basic blockout and gradually refining its shape and details while maintaining clean geometry. I then transferred the asset to Autodesk Maya for UV unwrapping, organising the UV shells and minimising distortion. Finally, I used Substance Painter to develop a dusty, aged appearance through material variation, dirt, roughness, and edge wear. The final presentation demonstrates the model, its wireframe, and the texture maps used to build its surface detail."
    ],
    "viking": [
        "The Viking Character project combines organic sculpting with hard-surface modelling. My goal was to create a character with a strong Viking-inspired appearance by combining believable anatomy with rugged armour, clothing, and accessories.",
        "I began by collecting anatomical references to study body proportions, muscle structure, facial features, and overall anatomy. Using a base mesh in ZBrush, I sculpted the character and progressively refined its major forms and smaller details. Once the body was established, I researched suitable armour, clothing, and props to develop a cohesive visual direction.",
        "One of the important learning experiences was creating hard-surface elements directly in ZBrush. I explored different techniques for building the chest armour, shoulder pieces, wrist guards, belt, and other accessories. Combining these rigid components with the organic sculpt helped me develop a more complete character while improving my understanding of anatomy, sculpting, and the integration of different modelling techniques."
    ],
    "robot": [
        "The Futuristic Robot project was inspired by an artist I discovered while browsing YouTube. The artist created mechanical models using discarded materials, which encouraged me to explore a similar industrial concept in 3D. I wanted to build a complex mechanical design with layered components and a distinctive silhouette.",
        "I started by collecting and organising references for the robot's major sections, including the upper body, minigun, missile launcher, middle body, and legs. Breaking the design into separate components helped me understand their shapes, proportions, and mechanical relationships before beginning the detailed modelling process.",
        "I modelled the individual components in Autodesk Maya, paying particular attention to the mechanical structure, joints, layered surfaces, and smaller details. The legs were especially challenging because of their intricate parts and multiple mechanical elements. The modelling process took approximately one month, from the initial blockout to the final details. This project significantly challenged me to improve my hard-surface modelling skills. The portfolio identifies the robot as a work in progress."
    ],
    "donut": [
        "The Donut project was created in Blender while following a Blender Guru tutorial. Although the subject is simple, it provided an opportunity to practise the relationship between modelling, materials, lighting, and final presentation.",
        "I modelled and refined the dough using sculpting and modifiers, introducing slight imperfections to make the surface feel more natural. I then created separate materials for the dough, icing, and sprinkles. Contrasting glossy and matte finishes helped distinguish the different surfaces and add visual depth.",
        "For the final render, I used warm lighting, soft shadows, and depth of field to establish a pleasant visual mood. The project helped me understand how relatively simple geometry can become more appealing through careful material choices, lighting, and composition."
    ],
    "fan": [
        "The Fan project explores the creation of a recognisable mechanical product as a 3D asset. The focus is on translating a physical object's overall shape and individual components into a coherent digital model.",
        "The modelling process involves establishing the main body and proportions before refining the individual structural elements. Particular attention is given to the relationship between the housing, blades, and supporting components so that the finished object reads clearly as a complete product.",
        "The project forms part of my exploration of hard-surface modelling and product-oriented 3D work. It provides an opportunity to practise form, proportion, component placement, and the presentation of a manufactured object."
    ],
    "controller": [
        "The Controller project explores the modelling of a familiar electronic device as a three-dimensional asset. The objective is to reproduce its overall silhouette and the arrangement of its physical controls in a clear, recognisable form.",
        "The modelling approach focuses on establishing the main body first, followed by the smaller components that define the device's identity. Maintaining consistent proportions and carefully placing the individual controls helps the model feel cohesive rather than like a collection of disconnected shapes.",
        "This project contributes to my hard-surface modelling practice by encouraging attention to product proportions, surface transitions, component placement, and small details that help a digital object resemble its real-world counterpart."
    ],
    "male-torso": [
        "Male Torso with Prop was created as a three-hour modelling test. The challenge was to create a male torso and head without using references, making anatomy, proportion, and efficient sculpting particularly important.",
        "Working within a limited timeframe required me to concentrate on the primary anatomical forms and establish a convincing structure before refining smaller details. Rather than relying on reference images, I had to make decisions about proportions and anatomy based on my existing understanding of the human body.",
        "Alongside the character, I created a Loki-inspired horned helmet as a prop. This added a hard-surface modelling element to the project and allowed me to combine organic sculpting with a more stylised accessory."
    ],
    "jug-lighting": [
        "The Three-Point Lighting project explores how lighting can define the shape, material, and visual presence of a 3D object. The subject is a jug with a smooth reflective body and darker contrasting details around the handle and base.",
        "The jug was textured and rendered in Autodesk Maya. The material treatment focuses on creating a clean, realistic finish while maintaining contrast between the main body and its darker components.",
        "I used a three-point lighting arrangement consisting of key, fill, and rim lights. Together, these lights define the object's form, soften shadows, and introduce a subtle edge highlight that separates the jug from its background."
    ],
    "rust-reminiscence": [
        "Rust & Reminiscence focuses on surface storytelling through texturing, material variation, and lighting. The aim is to give a 3D asset an aged appearance by introducing believable signs of use and weathering rather than relying on a uniform surface.",
        "I used Substance Painter to develop the material. Layers of dirt, rust, and edge wear, combined with smart materials and masks, helped create natural variation across the surface.",
        "After texturing, I imported the model into Autodesk Maya for lighting and rendering. An HDRI provided soft illumination and realistic reflections, while additional light adjustments helped reveal the model's shape and surface details."
    ],
    "golden-horizon": [
        "Whispers of the Golden Horizon is an environment-focused project that combines modelling, PBR texturing, and cinematic lighting to create a warm visual atmosphere.",
        "I prepared the scene for texturing by creating UV layouts in Autodesk Maya. I then used Substance Painter with a physically based rendering workflow to develop materials for surfaces such as wood, brick, and metal. Subtle wear and material variation helped prevent the environment from looking overly uniform.",
        "The final lighting and rendering were completed in Autodesk Maya. An HDRI combined with warm sunset lighting created soft shadows and a calm, cinematic mood."
    ],
    "particle-simulation": [
        "The Particle Simulation project explores procedural motion and the interaction of particles within a controlled 3D scene.",
        "I created the simulation in Blender using a particle system, adjusting emission, particle lifetime, and density to control how the particles behaved over time. Force fields, including turbulence and vortex, introduced variation to the motion, while collision boundaries helped contain the simulation.",
        "A transparent glass material with reflections and refraction enhanced the appearance of the container and the particles inside it. Glowing blue particles contrasted with the warmer floor, while lighting and shading introduced additional depth."
    ],
    "ocean-simulation": [
        "The Ocean Simulation project focuses on creating a dynamic water environment with a cinematic atmosphere. The scene combines fluid behaviour, surface shading, lighting, and environmental elements to communicate depth and scale.",
        "I created the fluid simulation in Blender using Mantaflow. The setup involved defining the simulation domain and fluid properties, then adjusting parameters such as resolution, viscosity, and wave motion.",
        "To strengthen the final presentation, I used reflections and variations in surface roughness to improve the water material. The warm light of a buoy contrasts with the darker surroundings, while a distant ship introduces a sense of scale."
    ],
    "organic-rigging": [
        "The Organic Rigging project focuses on creating a character rig that supports natural movement and gives an animator practical control over the model.",
        "I used Advanced Skeleton to build a structured joint system and create animator-friendly controllers. I then refined the character's deformations through weight painting, paying particular attention to areas around joints and the face.",
        "The process helped me understand the importance of joint placement, skinning, weight distribution, and hierarchy. The setup aims to provide smoother deformations and more believable movement while keeping the controls organised for animation."
    ],
    "mechanical-rigging": [
        "The Mechanical Rigging project explores how rigid mechanical objects can be prepared for controlled movement in animation. A mechanical rig needs to preserve component shapes while allowing each part to move around the correct pivot.",
        "I rigged a mechanical arm in Autodesk Maya, creating a clean joint hierarchy and carefully placing pivots to support precise movement. An IK/FK switching setup using Set Driven Keys provided flexible control.",
        "I also used constraints and an organised hierarchy to maintain predictable motion. The focus was on creating a stable and efficient rig that could be animated without unnecessary complexity."
    ],
    "car-rigging": [
        "The Car Rigging project focuses on building a control system that allows a vehicle to move convincingly in animation. A useful vehicle rig needs to coordinate the body, wheels, suspension, and additional components.",
        "I used cinematic vehicle-rigging techniques to establish a base rig with controls for the body, wheels, and suspension. I then adapted the rig to suit the model by refining its controls and hierarchy and adding extra bones for details such as antennas.",
        "These adjustments improved the flexibility of the setup and provided greater control over the vehicle's movement."
    ],
    "platformer": [
        "The 2D Platformer project was developed in Unity and marked my first experience working with the engine. The project focused on combining sprite-based visuals with basic gameplay mechanics to create a playable platforming experience.",
        "I worked with sprite sheets and explored asset integration, scene construction, and responsive controls. The game features five themed levels: ground, cement, industrial, ice, and space.",
        "The project also introduced me to game-level design. Planning obstacle layouts requires balancing difficulty, pacing, and player engagement."
    ],
    "3d-printing": [
        "The 3D Printing project explores the preparation of digital models for physical fabrication. Unlike a model intended only for rendering, a printable asset must have suitable geometry and a unified structure that can be processed by slicing software.",
        "The workflow began in Autodesk Maya, where the base forms and overall structure were developed. The models were then transferred to ZBrush for refinement. Dynamesh was used to combine components into a unified, watertight mesh before cleanup and preparation for printing.",
        "For the device model, the original base model was created by my friend Pranav. I separated the antenna from the main body, unified the parts in ZBrush, and exported the prepared model to Bambu Studio."
    ],
    "walk-cycle": [
        "The Walk Cycle project explores character movement through a short animation created in Autodesk Maya. Timing, spacing, balance, and foot placement all contribute to the impression of weight.",
        "I used a reference video to guide the animation. I established the key poses and then refined the movement with in-between poses to create continuous transitions.",
        "Particular attention was given to weight distribution and foot placement so that the character's movement would feel natural rather than mechanical."
    ],
    "sword-animation": [
        "The Sword Animation project explores object movement and timing in Autodesk Maya. The aim is to create an action that feels deliberate and believable rather than simply moving an object between two positions.",
        "I studied a reference and established the key poses that define the movement. I then refined the action through breakdowns and in-between poses to produce smoother motion.",
        "The project helped me practise timing, spacing, and pose refinement while learning how reference-based animation can guide the movement of a 3D object."
    ],
    "2d-animation": [
        "The 2D Animation project was created in Adobe Animate to practise timing, keyframes, and smooth movement. The scene uses simple shapes and clean lines to focus attention on character behaviour.",
        "I explored how subtle poses and eye direction can communicate a difference in emotion between characters. The contrast between a calm driver and an uneasy child helps convey the situation visually.",
        "This exercise strengthened my understanding of staging, visual storytelling, and clear poses."
    ],
    "photosynthesis": [
        "The Photosynthesis project was created as a demonstration video for a startup. The goal was to explain the subject through clear visuals and accessible animation.",
        "I researched references for the characters, environment, and visual elements needed to represent the concept. I recreated these elements in Adobe Animate, simplifying the designs into a clean visual style.",
        "I animated the scene with smooth movement so that the information could be presented in a clear sequence."
    ],
    "stop-motion": [
        "The Stop Motion Movie project was created from scratch using handmade characters and frame-by-frame animation. Stop motion requires physical elements to be adjusted and photographed repeatedly to create the illusion of movement.",
        "I directed the project, designed the characters, and handled the animation. The process required careful planning and precise adjustments between frames.",
        "Working through the complete process gave me experience in character design, animation, visual storytelling, and production planning."
    ]
};

/* =========================================
   MORE PROJECTS CAROUSEL
========================================= */
const projectCarouselTrack = document.getElementById("projectCarouselTrack");

const featuredProjectKeys = new Set(["red-reaper", "awm", "viking", "robot"]);

const projectCategories = {
    "donut": "MODELING · TEXTURING · LIGHTING",
    "fan": "MODELING · TEXTURING · RENDERING",
    "controller": "HARD SURFACE · PRODUCT DESIGN",
    "male-torso": "ORGANIC MODELING · SCULPTING",
    "jug-lighting": "MATERIALS · LIGHTING · RENDERING",
    "rust-reminiscence": "TEXTURING · PBR",
    "golden-horizon": "ENVIRONMENT · LIGHTING",
    "particle-simulation": "DYNAMICS · SIMULATION",
    "ocean-simulation": "FLUID SIMULATION · VFX",
    "organic-rigging": "CHARACTER RIGGING",
    "mechanical-rigging": "INORGANIC RIGGING",
    "car-rigging": "VEHICLE RIGGING",
    "platformer": "GAME DESIGN · UNITY",
    "3d-printing": "MODELING · 3D PRINTING",
    "walk-cycle": "3D ANIMATION",
    "sword-animation": "3D ANIMATION",
    "2d-animation": "2D ANIMATION",
    "photosynthesis": "EDUCATIONAL ANIMATION",
    "stop-motion": "STOP MOTION · STORYTELLING"
};

const carouselProjectKeys = [
    "donut", "fan", "controller", "male-torso", "jug-lighting",
    "rust-reminiscence", "golden-horizon", "particle-simulation",
    "ocean-simulation", "organic-rigging", "mechanical-rigging",
    "car-rigging", "platformer", "3d-printing", "walk-cycle",
    "sword-animation", "2d-animation", "photosynthesis", "stop-motion"
];

function renderProjectCarousel() {
    if (!projectCarouselTrack) return;

    projectCarouselTrack.replaceChildren();
    const fragment = document.createDocumentFragment();

    carouselProjectKeys.forEach((projectKey, index) => {
        if (featuredProjectKeys.has(projectKey)) return;

        const project = projectData[projectKey];
        if (!project || !project.images?.length) return;

        const card = document.createElement("article");
        card.className = "carousel-project-card";

        const link = document.createElement("a");
        link.href = "#";
        link.className = "project-image-wrap";
        link.dataset.project = projectKey;
        link.setAttribute("aria-label", `View ${project.title}`);

        const img = document.createElement("img");
        img.src = project.images[0].src;
        img.alt = project.title;
        img.loading = "lazy";

        const overlay = document.createElement("div");
        overlay.className = "project-overlay";

        const viewLabel = document.createElement("span");
        viewLabel.className = "project-view";
        viewLabel.append(document.createTextNode("VIEW PROJECT "));

        const arrow = document.createElement("span");
        arrow.textContent = "↗";
        viewLabel.appendChild(arrow);
        overlay.appendChild(viewLabel);
        link.append(img, overlay);

        const info = document.createElement("div");
        info.className = "carousel-project-info";

        const number = document.createElement("span");
        number.className = "carousel-project-number";
        number.textContent = String(index + 5).padStart(2, "0");

        const title = document.createElement("h3");
        title.textContent = project.title;

        const category = document.createElement("p");
        category.textContent = projectCategories[projectKey] || "3D ART · VISUAL DESIGN";

        info.append(number, title, category);
        card.append(link, info);
        fragment.appendChild(card);
    });

    projectCarouselTrack.appendChild(fragment);
}

renderProjectCarousel();

/* ========================================
   PROJECT MODAL — OPEN, RENDER, CLOSE
======================================== */
document.addEventListener("click", (event) => {
    const projectLink = event.target.closest(".project-image-wrap[data-project]");
    if (!projectLink) return;

    const projectKey = projectLink.dataset.project;
    const project = projectData[projectKey];
    if (!project) return;

    event.preventDefault();

    if (!projectModal || !projectModalTitle || !projectModalDescription || !projectModalGallery) {
        console.error("Project modal HTML is missing one or more required elements.");
        return;
    }

    projectModalTitle.textContent = project.title;
    projectModalDescription.textContent = project.description;
    projectModalGallery.replaceChildren();

    project.images.forEach((image) => {
        const figure = document.createElement("figure");
        figure.className = "project-gallery-item";

        const img = document.createElement("img");
        img.src = image.src;
        img.alt = `${project.title} — ${image.caption}`;
        img.loading = "lazy";

        const caption = document.createElement("figcaption");
        caption.textContent = image.caption;

        figure.append(img, caption);
        projectModalGallery.appendChild(figure);
    });

    if (projectModalStory) {
        projectModalStory.replaceChildren();

        const paragraphs = projectDetails[projectKey] || [
            "A detailed project description will be added soon."
        ];

        paragraphs.forEach((paragraphText) => {
            const paragraph = document.createElement("p");
            paragraph.textContent = paragraphText;
            projectModalStory.appendChild(paragraph);
        });
    }

    if (!projectModal.open) projectModal.showModal();
});

if (projectModalClose && projectModal) {
    projectModalClose.addEventListener("click", () => projectModal.close());
}

if (projectModal) {
    projectModal.addEventListener("click", (event) => {
        if (event.target === projectModal) projectModal.close();
    });
}


/* ========================================
   SKILLS & TOOLS — INTERACTIVE CAROUSEL
======================================== */

const skillsCarousel = document.getElementById("skillsCarousel");
const skillsTrack = document.getElementById("skillsTrack");

const skillsPrev = document.getElementById("skillsPrev");
const skillsNext = document.getElementById("skillsNext");

const skillsProgress = document.getElementById("skillsProgress");
const skillsProgressBar = document.getElementById("skillsProgressBar");


if (skillsCarousel && skillsTrack) {

    /* ========================================
       UPDATE PROGRESS BAR
    ======================================== */

    function updateSkillsProgress() {

        const maxScroll =
            skillsCarousel.scrollWidth - skillsCarousel.clientWidth;

        const currentScroll = skillsCarousel.scrollLeft;

        const progress = maxScroll > 0
            ? (currentScroll / maxScroll) * 100
            : 100;

        if (skillsProgressBar) {
            skillsProgressBar.style.width = `${progress}%`;
        }

        if (skillsProgress) {
            skillsProgress.setAttribute(
                "aria-valuenow",
                String(Math.round(progress))
            );
        }

        // Disable arrows when the carousel reaches either end.
        if (skillsPrev) {
            skillsPrev.disabled = currentScroll <= 1;
        }

        if (skillsNext) {
            skillsNext.disabled =
                currentScroll >= maxScroll - 1;
        }
    }


    /* ========================================
       SCROLL LEFT
    ======================================== */

    if (skillsPrev) {

        skillsPrev.addEventListener("click", () => {

            const firstCard = skillsTrack.querySelector(".skill-card");

            const cardWidth = firstCard
                ? firstCard.getBoundingClientRect().width
                : 160;

            const gap = 16;

            skillsCarousel.scrollBy({
                left: -(cardWidth + gap) * 2,
                behavior: "smooth"
            });

        });

    }


    /* ========================================
       SCROLL RIGHT
    ======================================== */

    if (skillsNext) {

        skillsNext.addEventListener("click", () => {

            const firstCard = skillsTrack.querySelector(".skill-card");

            const cardWidth = firstCard
                ? firstCard.getBoundingClientRect().width
                : 160;

            const gap = 16;

            skillsCarousel.scrollBy({
                left: (cardWidth + gap) * 2,
                behavior: "smooth"
            });

        });

    }


    /* ========================================
       TRACK SCROLL POSITION
    ======================================== */

    skillsCarousel.addEventListener(
        "scroll",
        updateSkillsProgress,
        { passive: true }
    );


    /* ========================================
       HANDLE WINDOW RESIZING
    ======================================== */

    window.addEventListener("resize", updateSkillsProgress);


    /* ========================================
       INITIALIZE CAROUSEL
    ======================================== */

    updateSkillsProgress();

}

/* =========================================
   CINEMATIC HERO PARALLAX — VERSION A
   ========================================= */

(() => {
    const hero = document.querySelector(".hero");

    if (!hero) return;

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    const desktop = window.matchMedia("(min-width: 769px)");

    if (reduceMotion.matches || !desktop.matches) return;

    let ticking = false;

    function updateHeroParallax() {
        const rect = hero.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (rect.bottom > 0 && rect.top < viewportHeight) {
            const progress = Math.max(
                0,
                Math.min(1, -rect.top / Math.max(rect.height, 1))
            );

            const offset = progress * 35;

            hero.style.backgroundPosition = `center ${offset}px`;
        }

        ticking = false;
    }

    function requestUpdate() {
        if (!ticking) {
            window.requestAnimationFrame(updateHeroParallax);
            ticking = true;
        }
    }

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    updateHeroParallax();
})();

/* =========================================
   PHASE 3A — SECTION DIVIDER REVEALS
   ========================================= */

(() => {
    const dividers = document.querySelectorAll(".section-divider");

    if (!dividers.length) return;

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
        dividers.forEach((divider) => divider.classList.add("visible"));
        return;
    }

    const dividerObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    dividers.forEach((divider) => dividerObserver.observe(divider));
})();

/* =========================================
   CINEMATIC PH INTRO — SESSION CONTROL
   ========================================= */
(() => {
    const root = document.documentElement;
    const loader = document.getElementById("phLoader");

    if (!loader || !root.classList.contains("ph-loader-pending")) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
        root.classList.remove("ph-loader-pending");
        root.classList.add("ph-loader-done");
        return;
    }

    // Remember immediately so a refresh during/after the intro won't replay it.
    try {
        sessionStorage.setItem("ph-loader-seen", "1");
    } catch (error) {
        // The animation still works if session storage is blocked.
    }

    // Start after first paint, allowing the split screen to render cleanly.
    requestAnimationFrame(() => {
        requestAnimationFrame(() => root.classList.add("ph-loader-opening"));
    });

    // Panels open, the P/H travel inward, the joined monogram appears, then exits.
    window.setTimeout(() => {
        root.classList.add("ph-loader-exit");
    }, 2650);

    window.setTimeout(() => {
        root.classList.remove("ph-loader-pending", "ph-loader-opening", "ph-loader-exit");
        root.classList.add("ph-loader-done");
    }, 3150);
})();

