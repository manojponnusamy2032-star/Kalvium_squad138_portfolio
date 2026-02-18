
// =============================
// Squad 138 – Elite Developer Fellowship
// Premium Cinematic Intro Animation with Dynamic Position Calculation
// =============================

document.addEventListener('DOMContentLoaded', () => {
	// ============================================
	// PREMIUM CINEMATIC INTRO ANIMATION CONTROLLER
	// ============================================
	
	const introOverlay = document.querySelector('.intro-overlay');
	const introBrand = document.querySelector('.intro-brand');
	const navBrand = document.querySelector('.nav-brand');
	const navbar = document.querySelector('.navbar');
	const navEntry = performance.getEntriesByType('navigation')[0];
	const navType = navEntry ? navEntry.type : (performance.navigation && performance.navigation.type === 1 ? 'reload' : 'navigate');
	const cameFromStudent = sessionStorage.getItem('fromStudent') === 'true';
	
	if (cameFromStudent) {
		sessionStorage.removeItem('fromStudent');
	}
	
	const shouldPlayIntro = navType === 'reload' || !cameFromStudent;
	
	if (introOverlay && introBrand && navBrand && navbar) {
		if (!shouldPlayIntro) {
			introOverlay.remove();
			document.body.classList.add('intro-complete');
			initScrollAnimations();
			initProfileCardClicks();
			return;
		}
		
		// ============================================
		// ANIMATION TIMELINE
		// ============================================
		// 0s - 1.2s: Fade in (centered, scale 2.4)
		// 1.2s - 2s: Hold in center
		// 2s - 3.4s: Move to exact navbar position (scale 2.4 → 1)
		// 3.4s - 4s: Navbar fades in
		// 3.6s - 4.2s: Overlay fades out
		// ============================================
		
		// After 2 seconds: Calculate exact position and animate to navbar
		setTimeout(() => {
			// ============================================
			// STEP 1: Get current positions of both elements
			// ============================================
			const navRect = navBrand.getBoundingClientRect();
			const introRect = introBrand.getBoundingClientRect();
			
			// ============================================
			// STEP 2: Calculate translation difference
			// We need to move from current intro position to navbar position
			// ============================================
			const deltaX = navRect.left - introRect.left;
			const deltaY = navRect.top - introRect.top;
			
			// ============================================
			// STEP 3: Apply smooth transition with scale down
			// Intro is at scale(2.4), navbar is at scale(1)
			// Explicitly set final scale to 1 for exact navbar match
			// Ultra-smooth cubic-bezier easing for premium feel
			// ============================================
			introBrand.style.transition = 'transform 1.4s cubic-bezier(0.22, 1, 0.36, 1)';
			introBrand.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1)`;
			
			// ============================================
			// STEP 4: Fade in navbar at 3.4s
			// No text replacement needed - both have same content
			// ============================================
			setTimeout(() => {
				navbar.style.opacity = '1';
			}, 1400); // 1.4s after movement starts = 3.4s total
			
		}, 2000); // Start movement at 2s
		
		// ============================================
		// STEP 6: Fade out overlay at 3.6s
		// ============================================
		setTimeout(() => {
			introOverlay.style.transition = 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
			introOverlay.style.opacity = '0';
			
			// ============================================
			// STEP 7: Clean up and enable scroll at 4.2s
			// ============================================
			setTimeout(() => {
				document.body.classList.add('intro-complete');
				introOverlay.remove();
				
				// Initialize scroll animations after intro completes
				initScrollAnimations();
				
				// Initialize profile card click handlers
				initProfileCardClicks();
			}, 600); // 0.6s fade out
			
		}, 3600); // Start fade at 3.6s
	} else {
		// If no intro animation (e.g., page refresh or direct navigation)
		// Initialize features immediately
		document.body.classList.add('intro-complete');
		initScrollAnimations();
		initProfileCardClicks();
	}
	
	// ============================================
	// PROFILE CARD CLICK HANDLERS
	// ============================================
	function initProfileCardClicks() {
		// Add click handlers to all static HTML cards (mentor and folk cards)
		document.querySelectorAll('.mentor-card, .folk-card').forEach(card => {
			card.style.cursor = 'pointer';
			
			card.addEventListener('click', () => {
				const id = card.getAttribute('data-id');
				if (id) {
					sessionStorage.setItem('fromStudent', 'true');
					window.location.href = `student.html?id=${id}`;
				}
			});
			
			// Keyboard accessibility
			card.setAttribute('tabindex', '0');
			card.addEventListener('keypress', (e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					const id = card.getAttribute('data-id');
					if (id) {
						sessionStorage.setItem('fromStudent', 'true');
						window.location.href = `student.html?id=${id}`;
					}
				}
			});
		});
	}
	
	// ============================================
	// SMOOTH SCROLL ANIMATIONS
	// ============================================
	function initScrollAnimations() {
		// Select all elements that should animate on scroll
		const animateElements = document.querySelectorAll(
			'.hero-section, .mentors-section, .folks-section, ' +
			'.mentor-card, .folk-card, .folks-header, .folks-heading, ' +
			'.mentors-heading, .hero-title, .hero-subtitle, .cta-btn'
		);
		
		// Add scroll-animate class to all selected elements
		animateElements.forEach((el, index) => {
			// Add base animation class
			el.classList.add('scroll-animate');
		});
		
		// Create Intersection Observer
		const observerOptions = {
			threshold: 0.1, // Trigger when 10% of element is visible
			rootMargin: '0px 0px -50px 0px' // Start animation slightly before element enters viewport
		};
		
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					// Add animate-in class when element is visible
					entry.target.classList.add('animate-in');
					// Optional: stop observing after animation (one-time animation)
					observer.unobserve(entry.target);
				}
			});
		}, observerOptions);
		
		// Observe all animate elements
		animateElements.forEach(el => observer.observe(el));
	}
	// -----------------------------
	// 1. DATA STRUCTURE
	// -----------------------------
	const squadMembers = [
		// Main Mentor
		{
			id: 'main-mentor',
			name: 'Dr. Aryan Kapoor',
			role: 'Main Mentor',
			image: 'images/aryan.jpg',
			github: 'https://github.com/aryankapoor',
			linkedin: 'https://linkedin.com/in/aryankapoor',
			bio: 'Lead architect and mentor with 15+ years in FinTech and EdTech. Passionate about building elite developer teams.',
			dream: 'Empowering the next generation of tech leaders.',
			skills: ['Leadership', 'React', 'Node.js', 'Cloud', 'FinTech'],
			projects: [
				{ title: 'FinEdge Platform', description: 'A scalable digital banking solution for emerging markets.', link: 'https://github.com/aryankapoor/finedge' },
				{ title: 'MentorHub', description: 'AI-powered mentorship matching for tech fellows.', link: 'https://github.com/aryankapoor/mentorhub' }
			]
		},
		// Mentor 1
		{
			id: 'mentor-jaya',
			name: 'Jaya Menon',
			role: 'Mentor',
			image: 'images/jaya.jpg',
			github: 'https://github.com/jayamenon',
			linkedin: 'https://linkedin.com/in/jayamenon',
			bio: 'UI/UX specialist and product designer. Loves crafting beautiful, accessible interfaces.',
			dream: 'Designing products that change lives.',
			skills: ['UI/UX', 'Figma', 'Accessibility', 'React'],
			projects: [
				{ title: 'Pulse UI Kit', description: 'A modern UI kit for FinTech dashboards.', link: 'https://github.com/jayamenon/pulse-ui' }
			]
		},
		// Mentor 2
		{
			id: 'mentor-rahul',
			name: 'Rahul Deshmukh',
			role: 'Mentor',
			image: 'images/rahul.jpg',
			github: 'https://github.com/rahuldeshmukh',
			linkedin: 'https://linkedin.com/in/rahuldeshmukh',
			bio: 'Backend engineer and DevOps mentor. Enjoys automating everything.',
			dream: 'Building systems that never go down.',
			skills: ['Node.js', 'DevOps', 'AWS', 'Docker'],
			projects: [
				{ title: 'AutoDeploy', description: 'CI/CD automation for cloud-native apps.', link: 'https://github.com/rahuldeshmukh/autodeploy' }
			]
		},
		// Demo Fellows
		{
			id: 'fellow-aarav',
			name: 'Aarav Kumar',
			role: 'Fellow',
			image: 'images/aarav.jpg',
			github: 'https://github.com/aaravkumar',
			linkedin: 'https://linkedin.com/in/aaravkumar',
			bio: 'Front-end enthusiast. Loves React and design systems.',
			dream: 'To build products used by millions.',
			skills: ['React', 'JavaScript', 'CSS'],
			projects: [
				{ title: 'Taskly', description: 'A productivity app for teams.', link: 'https://github.com/aaravkumar/taskly' }
			]
		},
		{
			id: 'fellow-priya',
			name: 'Priya Sharma',
			role: 'Fellow',
			image: 'images/priya.jpg',
			github: 'https://github.com/priyasharma',
			linkedin: 'https://linkedin.com/in/priyasharma',
			bio: 'Full-stack developer. Passionate about APIs and cloud.',
			dream: 'To launch a SaaS startup.',
			skills: ['Node.js', 'MongoDB', 'AWS'],
			projects: [
				{ title: 'CloudNotes', description: 'A secure note-taking app.', link: 'https://github.com/priyasharma/cloudnotes' }
			]
		},
		{
			id: 'fellow-rohan',
			name: 'Rohan Mehta',
			role: 'Fellow',
			image: 'images/rohan.jpg',
			github: 'https://github.com/rohanmehta',
			linkedin: 'https://linkedin.com/in/rohanmehta',
			bio: 'Mobile developer. Flutter and cross-platform advocate.',
			dream: 'To build the next big mobile app.',
			skills: ['Flutter', 'Dart', 'Firebase'],
			projects: [
				{ title: 'FitTrack', description: 'A fitness tracking app.', link: 'https://github.com/rohanmehta/fittrack' }
			]
		},
		{
			id: 'fellow-sara',
			name: 'Sara Iqbal',
			role: 'Fellow',
			image: 'images/sara.jpg',
			github: 'https://github.com/saraiqbal',
			linkedin: 'https://linkedin.com/in/saraiqbal',
			bio: 'Data science fellow. Loves ML and data viz.',
			dream: 'To make AI accessible to all.',
			skills: ['Python', 'Pandas', 'ML'],
			projects: [
				{ title: 'Vizly', description: 'A data visualization toolkit.', link: 'https://github.com/saraiqbal/vizly' }
			]
		},
		{
			id: 'fellow-dev',
			name: 'Dev Patel',
			role: 'Fellow',
			image: 'images/dev.jpg',
			github: 'https://github.com/devpatel',
			linkedin: 'https://linkedin.com/in/devpatel',
			bio: 'Backend and API specialist. Enjoys scalable systems.',
			dream: 'To architect global platforms.',
			skills: ['Node.js', 'Express', 'PostgreSQL'],
			projects: [
				{ title: 'APIgen', description: 'API scaffolding tool.', link: 'https://github.com/devpatel/apigen' }
			]
		},
		{
				// ...existing code...

			id: 'fellow-meera',
			name: 'Meera Singh',
			role: 'Fellow',
			image: 'images/meera.jpg',
			github: 'https://github.com/meerasingh',
			linkedin: 'https://linkedin.com/in/meerasingh',
			bio: 'UI engineer. Loves animation and micro-interactions.',
			dream: 'To design delightful user experiences.',
			skills: ['CSS', 'GSAP', 'UI/UX'],
			projects: [
				{ title: 'Animagic', description: 'Animation library for the web.', link: 'https://github.com/meerasingh/animagic' }
			]
		},
		{
			id: 'fellow-kabir',
			name: 'Kabir Joshi',
			role: 'Fellow',
			image: 'images/kabir.jpg',
			github: 'https://github.com/kabirjoshi',
			linkedin: 'https://linkedin.com/in/kabirjoshi',
			bio: 'Full-stack developer passionate about building scalable applications.',
			dream: 'To create innovative tech solutions.',
			skills: ['JavaScript', 'React', 'Node.js'],
			projects: [
				{ title: 'WebFlow', description: 'Workflow automation platform.', link: 'https://github.com/kabirjoshi/webflow' }
			]
		},
		{
			id: 'fellow-ananya',
			name: 'Ananya Rao',
			role: 'Fellow',
			image: 'images/ananya.jpg',
			github: 'https://github.com/ananyarao',
			linkedin: 'https://linkedin.com/in/ananyarao',
			bio: 'Frontend developer with a passion for clean code and UX.',
			dream: 'To build accessible web applications.',
			skills: ['HTML', 'CSS', 'JavaScript'],
			projects: [
				{ title: 'AccessUI', description: 'Accessible component library.', link: 'https://github.com/ananyarao/accessui' }
			]
		},
		{
			id: 'fellow-vikram',
			name: 'Vikram Desai',
			role: 'Fellow',
			image: 'images/vikram.jpg',
			github: 'https://github.com/vikramdesai',
			linkedin: 'https://linkedin.com/in/vikramdesai',
			bio: 'Backend specialist focused on API development.',
			dream: 'To architect robust backend systems.',
			skills: ['Python', 'Django', 'REST APIs'],
			projects: [
				{ title: 'FastAPI Pro', description: 'High-performance API framework.', link: 'https://github.com/vikramdesai/fastapi-pro' }
			]
		},
		{
			id: 'fellow-neha',
			name: 'Neha Pillai',
			role: 'Fellow',
			image: 'images/neha.jpg',
			github: 'https://github.com/nehapillai',
			linkedin: 'https://linkedin.com/in/nehapillai',
			bio: 'Data engineer passionate about big data and analytics.',
			dream: 'To solve complex data challenges.',
			skills: ['Python', 'SQL', 'Apache Spark'],
			projects: [
				{ title: 'DataPipe', description: 'ETL pipeline framework.', link: 'https://github.com/nehapillai/datapipe' }
			]
		},
		{
			id: 'fellow-siddharth',
			name: 'Siddharth Jain',
			role: 'Fellow',
			image: 'images/siddharth.jpg',
			github: 'https://github.com/siddharthjain',
			linkedin: 'https://linkedin.com/in/siddharthjain',
			bio: 'DevOps engineer focused on cloud infrastructure.',
			dream: 'To build resilient cloud systems.',
			skills: ['Docker', 'Kubernetes', 'AWS'],
			projects: [
				{ title: 'CloudOps', description: 'Cloud automation toolkit.', link: 'https://github.com/siddharthjain/cloudops' }
			]
		},
		{
			id: 'fellow-ishita',
			name: 'Ishita Malhotra',
			role: 'Fellow',
			image: 'images/ishita.jpg',
			github: 'https://github.com/ishitamalhotra',
			linkedin: 'https://linkedin.com/in/ishitamalhotra',
			bio: 'Mobile developer specializing in iOS applications.',
			dream: 'To create beautiful mobile experiences.',
			skills: ['Swift', 'iOS', 'UIKit'],
			projects: [
				{ title: 'SwiftUI Pro', description: 'SwiftUI component library.', link: 'https://github.com/ishitamalhotra/swiftui-pro' }
			]
		},
		{
			id: 'fellow-arjun',
			name: 'Arjun Nair',
			role: 'Fellow',
			image: 'images/arjun.jpg',
			github: 'https://github.com/arjunnair',
			linkedin: 'https://linkedin.com/in/arjunnair',
			bio: 'Full-stack developer with expertise in MERN stack.',
			dream: 'To build scalable web applications.',
			skills: ['MongoDB', 'Express', 'React'],
			projects: [
				{ title: 'MERN Starter', description: 'Boilerplate for MERN apps.', link: 'https://github.com/arjunnair/mern-starter' }
			]
		},
		{
			id: 'fellow-tanya',
			name: 'Tanya Bhatt',
			role: 'Fellow',
			image: 'images/tanya.jpg',
			github: 'https://github.com/tanyabhatt',
			linkedin: 'https://linkedin.com/in/tanyabhatt',
			bio: 'UI/UX designer and frontend developer.',
			dream: 'To design products that delight users.',
			skills: ['Figma', 'React', 'Tailwind CSS'],
			projects: [
				{ title: 'DesignKit', description: 'Design system toolkit.', link: 'https://github.com/tanyabhatt/designkit' }
			]
		},
		{
			id: 'fellow-rahul',
			name: 'Rahul Choudhary',
			role: 'Fellow',
			image: 'images/rahul-c.jpg',
			github: 'https://github.com/rahulchoudhary',
			linkedin: 'https://linkedin.com/in/rahulchoudhary',
			bio: 'Backend developer focused on microservices architecture.',
			dream: 'To build distributed systems at scale.',
			skills: ['Java', 'Spring Boot', 'Microservices'],
			projects: [
				{ title: 'MicroFrame', description: 'Microservices framework.', link: 'https://github.com/rahulchoudhary/microframe' }
			]
		},
		{
			id: 'fellow-sneha',
			name: 'Sneha Reddy',
			role: 'Fellow',
			image: 'images/sneha.jpg',
			github: 'https://github.com/snehareddy',
			linkedin: 'https://linkedin.com/in/snehareddy',
			bio: 'Machine learning engineer passionate about AI.',
			dream: 'To make AI accessible to everyone.',
			skills: ['Python', 'TensorFlow', 'scikit-learn'],
			projects: [
				{ title: 'MLKit', description: 'Machine learning toolkit.', link: 'https://github.com/snehareddy/mlkit' }
			]
		},
		{
			id: 'fellow-karan',
			name: 'Karan Sethi',
			role: 'Fellow',
			image: 'images/karan.jpg',
			github: 'https://github.com/karansethi',
			linkedin: 'https://linkedin.com/in/karansethi',
			bio: 'Game developer and graphics programmer.',
			dream: 'To create immersive gaming experiences.',
			skills: ['Unity', 'C#', '3D Graphics'],
			projects: [
				{ title: 'GameEngine', description: '2D game engine.', link: 'https://github.com/karansethi/gameengine' }
			]
		},
		{
			id: 'fellow-simran',
			name: 'Simran Kaur',
			role: 'Fellow',
			image: 'images/simran.jpg',
			github: 'https://github.com/simrankaur',
			linkedin: 'https://linkedin.com/in/simrankaur',
			bio: 'Cybersecurity enthusiast and ethical hacker.',
			dream: 'To make the internet safer.',
			skills: ['Security', 'Penetration Testing', 'Python'],
			projects: [
				{ title: 'SecureVault', description: 'Password manager.', link: 'https://github.com/simrankaur/securevault' }
			]
		},
		{
			id: 'fellow-manav',
			name: 'Manav Gupta',
			role: 'Fellow',
			image: 'images/manav.jpg',
			github: 'https://github.com/manavgupta',
			linkedin: 'https://linkedin.com/in/manavgupta',
			bio: 'Blockchain developer exploring Web3.',
			dream: 'To build decentralized applications.',
			skills: ['Solidity', 'Ethereum', 'Web3.js'],
			projects: [
				{ title: 'DApp Starter', description: 'Decentralized app boilerplate.', link: 'https://github.com/manavgupta/dapp-starter' }
			]
		},
		{
			id: 'fellow-aditi',
			name: 'Aditi Verma',
			role: 'Fellow',
			image: 'images/aditi.jpg',
			github: 'https://github.com/aditiverma',
			linkedin: 'https://linkedin.com/in/aditiverma',
			bio: 'QA engineer passionate about test automation.',
			dream: 'To ensure flawless software quality.',
			skills: ['Selenium', 'Jest', 'Cypress'],
			projects: [
				{ title: 'AutoTest', description: 'Test automation framework.', link: 'https://github.com/aditiverma/autotest' }
			]
		},
		{
			id: 'fellow-yash',
			name: 'Yash Agarwal',
			role: 'Fellow',
			image: 'images/yash.jpg',
			github: 'https://github.com/yashagarwal',
			linkedin: 'https://linkedin.com/in/yashagarwal',
			bio: 'Cloud architect specializing in serverless.',
			dream: 'To build cost-effective cloud solutions.',
			skills: ['AWS Lambda', 'Serverless', 'CloudFormation'],
			projects: [
				{ title: 'ServerlessKit', description: 'Serverless toolkit.', link: 'https://github.com/yashagarwal/serverlesskit' }
			]
		},
		{
			id: 'fellow-riya',
			name: 'Riya Sen',
			role: 'Fellow',
			image: 'images/riya.jpg',
			github: 'https://github.com/riyasen',
			linkedin: 'https://linkedin.com/in/riyasen',
			bio: 'Product manager with a technical background.',
			dream: 'To build products users love.',
			skills: ['Product Management', 'Agile', 'SQL'],
			projects: [
				{ title: 'ProductFlow', description: 'Product roadmap tool.', link: 'https://github.com/riyasen/productflow' }
			]
		},
		{
			id: 'fellow-mohit',
			name: 'Mohit Bansal',
			role: 'Fellow',
			image: 'images/mohit.jpg',
			github: 'https://github.com/mohitbansal',
			linkedin: 'https://linkedin.com/in/mohitbansal',
			bio: 'Performance optimization specialist.',
			dream: 'To make web apps lightning fast.',
			skills: ['Performance', 'Web Vitals', 'Optimization'],
			projects: [
				{ title: 'SpeedKit', description: 'Web performance toolkit.', link: 'https://github.com/mohitbansal/speedkit' }
			]
		},
		{
			id: 'fellow-pooja',
			name: 'Pooja Nair',
			role: 'Fellow',
			image: 'images/pooja.jpg',
			github: 'https://github.com/poojanair',
			linkedin: 'https://linkedin.com/in/poojanair',
			bio: 'Technical writer and documentation specialist.',
			dream: 'To make complex tech easy to understand.',
			skills: ['Technical Writing', 'Markdown', 'Documentation'],
			projects: [
				{ title: 'DocGen', description: 'Documentation generator.', link: 'https://github.com/poojanair/docgen' }
			]
		},
		{
			id: 'fellow-saurabh',
			name: 'Saurabh Mishra',
			role: 'Fellow',
			image: 'images/saurabh.jpg',
			github: 'https://github.com/saurabhmishra',
			linkedin: 'https://linkedin.com/in/saurabhmishra',
			bio: 'Database administrator and SQL expert.',
			dream: 'To optimize data at scale.',
			skills: ['PostgreSQL', 'MySQL', 'Database Design'],
			projects: [
				{ title: 'QueryOptimizer', description: 'SQL query optimization tool.', link: 'https://github.com/saurabhmishra/queryoptimizer' }
			]
		},
		{
			id: 'fellow-nikita',
			name: 'Nikita Das',
			role: 'Fellow',
			image: 'images/nikita.jpg',
			github: 'https://github.com/nikitadas',
			linkedin: 'https://linkedin.com/in/nikitadas',
			bio: 'AR/VR developer creating immersive experiences.',
			dream: 'To build the metaverse.',
			skills: ['Unity', 'AR', 'VR'],
			projects: [
				{ title: 'VRWorld', description: 'Virtual reality platform.', link: 'https://github.com/nikitadas/vrworld' }
			]
		},
		{
			id: 'fellow-aditya',
			name: 'Aditya Singh',
			role: 'Fellow',
			image: 'images/aditya.jpg',
			github: 'https://github.com/adityasingh',
			linkedin: 'https://linkedin.com/in/adityasingh',
			bio: 'Systems programmer working with low-level code.',
			dream: 'To build efficient system software.',
			skills: ['C++', 'Systems Programming', 'Linux'],
			projects: [
				{ title: 'SysCore', description: 'System utilities library.', link: 'https://github.com/adityasingh/syscore' }
			]
		},
		{
			id: 'fellow-shreya',
			name: 'Shreya Kapoor',
			role: 'Fellow',
			image: 'images/shreya.jpg',
			github: 'https://github.com/shreyakapoor',
			linkedin: 'https://linkedin.com/in/shreyakapoor',
			bio: 'IoT developer working with connected devices.',
			dream: 'To connect the physical and digital worlds.',
			skills: ['IoT', 'Arduino', 'Raspberry Pi'],
			projects: [
				{ title: 'SmartHome', description: 'Home automation system.', link: 'https://github.com/shreyakapoor/smarthome' }
			]
		},
		{
			id: 'fellow-vishal',
			name: 'Vishal Chauhan',
			role: 'Fellow',
			image: 'images/vishal.jpg',
			github: 'https://github.com/vishalchauhan',
			linkedin: 'https://linkedin.com/in/vishalchauhan',
			bio: 'Network engineer and infrastructure specialist.',
			dream: 'To build reliable network infrastructure.',
			skills: ['Networking', 'Cisco', 'Network Security'],
			projects: [
				{ title: 'NetMonitor', description: 'Network monitoring tool.', link: 'https://github.com/vishalchauhan/netmonitor' }
			]
		},
		{
			id: 'fellow-lavanya',
			name: 'Lavanya Menon',
			role: 'Fellow',
			image: 'images/lavanya.jpg',
			github: 'https://github.com/lavanyamenon',
			linkedin: 'https://linkedin.com/in/lavanyamenon',
			bio: 'SEO specialist and digital marketer.',
			dream: 'To help businesses grow online.',
			skills: ['SEO', 'Digital Marketing', 'Analytics'],
			projects: [
				{ title: 'SEOKit', description: 'SEO optimization toolkit.', link: 'https://github.com/lavanyamenon/seokit' }
			]
		},
		{
			id: 'fellow-harshita',
			name: 'Harshita Goyal',
			role: 'Fellow',
			image: 'images/harshita.jpg',
			github: 'https://github.com/harshitagoyal',
			linkedin: 'https://linkedin.com/in/harshitagoyal',
			bio: 'Content strategist and community manager.',
			dream: 'To build engaged online communities.',
			skills: ['Content Strategy', 'Community Building', 'Social Media'],
			projects: [
				{ title: 'CommunityHub', description: 'Community management platform.', link: 'https://github.com/harshitagoyal/communityhub' }
			]
		},
		{
			id: 'fellow-rajat',
			name: 'Rajat Tiwari',
			role: 'Fellow',
			image: 'images/rajat.jpg',
			github: 'https://github.com/rajattiwari',
			linkedin: 'https://linkedin.com/in/rajattiwari',
			bio: 'Business analyst with coding skills.',
			dream: 'To bridge business and technology.',
			skills: ['Business Analysis', 'SQL', 'Power BI'],
			projects: [
				{ title: 'BizInsights', description: 'Business intelligence dashboard.', link: 'https://github.com/rajattiwari/bizinsights' }
			]
		},
		{
			id: 'fellow-sanya',
			name: 'Sanya Arora',
			role: 'Fellow',
			image: 'images/sanya.jpg',
			github: 'https://github.com/sanyaarora',
			linkedin: 'https://linkedin.com/in/sanyaarora',
			bio: 'E-commerce specialist and marketplace developer.',
			dream: 'To revolutionize online shopping.',
			skills: ['E-commerce', 'Shopify', 'Payment Gateways'],
			projects: [
				{ title: 'ShopPro', description: 'E-commerce platform.', link: 'https://github.com/sanyaarora/shoppro' }
			]
		},
		{
			id: 'fellow-aman',
			name: 'Aman Khanna',
			role: 'Fellow',
			image: 'images/aman.jpg',
			github: 'https://github.com/amankhanna',
			linkedin: 'https://linkedin.com/in/amankhanna',
			bio: 'EdTech enthusiast building learning platforms.',
			dream: 'To democratize education through technology.',
			skills: ['React', 'Node.js', 'LMS'],
			projects: [
				{ title: 'LearnHub', description: 'Online learning platform.', link: 'https://github.com/amankhanna/learnhub' }
			]
		},
		{
			id: 'fellow-shruti',
			name: 'Shruti Joshi',
			role: 'Fellow',
			image: 'images/shruti.jpg',
			github: 'https://github.com/shrutijoshi',
			linkedin: 'https://linkedin.com/in/shrutijoshi',
			bio: 'FinTech developer working on payment solutions.',
			dream: 'To make financial services accessible.',
			skills: ['Payment APIs', 'Stripe', 'Security'],
			projects: [
				{ title: 'PayFlow', description: 'Payment processing system.', link: 'https://github.com/shrutijoshi/payflow' }
			]
		},
		{
			id: 'fellow-dhruv',
			name: 'Dhruv Sharma',
			role: 'Fellow',
			image: 'images/dhruv.jpg',
			github: 'https://github.com/dhruvsharma',
			linkedin: 'https://linkedin.com/in/dhruvsharma',
			bio: 'HealthTech developer creating medical software.',
			dream: 'To improve healthcare through technology.',
			skills: ['Healthcare IT', 'FHIR', 'Medical Apps'],
			projects: [
				{ title: 'HealthTrack', description: 'Health monitoring app.', link: 'https://github.com/dhruvsharma/healthtrack' }
			]
		}
	];

	// -----------------------------
	// 2. INDEX PAGE RENDERING
	// -----------------------------
	const isIndex = document.body && document.querySelector('.hero-section');
	const isStudent = document.body && document.querySelector('.profile-hero-section');

	// Helper: Get member by ID
	function getMemberById(id) {
		return squadMembers.find(m => m.id === id);
	}

	// Helper: Render a mentor or fellow card
	function renderCard(member, cardType = 'fellow') {
		const card = document.createElement('div');
		card.className = cardType === 'mentor' ? 'mentor-card fade-in-element' : 'fellow-card fade-in-element';
		if (cardType === 'mentor' && member.role === 'Main Mentor') card.classList.add('mentor-main');
		if (cardType === 'mentor' && member.role !== 'Main Mentor') card.classList.add('mentor-secondary');
		if (cardType === 'fellow') card.tabIndex = 0;
		// Image
		const img = document.createElement('div');
		img.className = cardType === 'mentor' ? 'mentor-photo' : 'fellow-photo';
		if (cardType === 'mentor' && member.role === 'Main Mentor') img.classList.add('mentor-photo-main');
		img.style.backgroundImage = `url('${member.image}')`;
		img.style.backgroundSize = 'cover';
		img.style.backgroundPosition = 'center';
		img.setAttribute('aria-label', member.name);
		// Name
		const name = document.createElement('div');
		name.className = cardType === 'mentor' ? 'mentor-name' : 'fellow-name';
		name.textContent = member.name;
		card.appendChild(img);
		card.appendChild(name);
		// Role (for mentors)
		if (cardType === 'mentor') {
			const role = document.createElement('div');
			role.className = 'mentor-role';
			role.textContent = member.role;
			card.appendChild(role);
		}
		// Click to profile
		card.addEventListener('click', () => {
			window.location.href = `student.html?id=${member.id}`;
		});
		card.addEventListener('keypress', e => {
			if (e.key === 'Enter') window.location.href = `student.html?id=${member.id}`;
		});

		return card;
	}

	if (isIndex) {
		// Render mentors
		const mentorsGrid = document.querySelector('.mentors-grid');
		if (mentorsGrid) {
			// Main mentor
			const mainMentor = squadMembers.find(m => m.role === 'Main Mentor');
			const mentors = squadMembers.filter(m => m.role === 'Mentor');
			mentorsGrid.innerHTML = '';
			mentorsGrid.appendChild(renderCard(mainMentor, 'mentor'));
			mentors.forEach(mentor => mentorsGrid.appendChild(renderCard(mentor, 'mentor')));
		}
		// Render fellows
		const fellowsGrid = document.getElementById('fellowsGrid');
		if (fellowsGrid) {
			fellowsGrid.innerHTML = '';
			squadMembers.filter(m => m.role === 'Fellow').forEach(fellow => {
				fellowsGrid.appendChild(renderCard(fellow, 'fellow'));
			});
		}
		// Search filter
		const searchInput = document.getElementById('searchInput');
		if (searchInput && fellowsGrid) {
			searchInput.addEventListener('input', e => {
				const val = e.target.value.toLowerCase();
				fellowsGrid.innerHTML = '';
				squadMembers.filter(m => m.role === 'Fellow' && m.name.toLowerCase().includes(val)).forEach(fellow => {
					fellowsGrid.appendChild(renderCard(fellow, 'fellow'));
				});
			});
		}
	}

	// -----------------------------
	// 3. PROFILE PAGE LOGIC
	// -----------------------------
	function populateProfile(member) {
		if (!member) return;
		const img = document.getElementById('profileImage');
		if (img) {
			img.src = member.image;
			img.alt = member.name;
		}
		const name = document.getElementById('profileName');
		if (name) name.textContent = member.name;
		const role = document.getElementById('profileRole');
		if (role) role.textContent = member.role;
		const github = document.getElementById('profileGithub');
		if (github) github.href = member.github;
		const linkedin = document.getElementById('profileLinkedin');
		if (linkedin) linkedin.href = member.linkedin;
		const bio = document.getElementById('profileBio');
		if (bio) bio.textContent = member.bio;
		const dream = document.getElementById('profileDream');
		if (dream) dream.textContent = member.dream;
		// Skills
		const skills = document.getElementById('profileSkills');
		if (skills) {
			skills.innerHTML = '';
			member.skills.forEach(skill => {
				const tag = document.createElement('span');
				tag.className = 'profile-skill-tag';
				tag.textContent = skill;
				skills.appendChild(tag);
			});
		}
		// Projects
		const projectsGrid = document.getElementById('profileProjects');
		if (projectsGrid) {
			projectsGrid.innerHTML = '';
			member.projects.forEach(project => {
				const card = document.createElement('div');
				card.className = 'profile-project-card fade-in-element';
				const title = document.createElement('div');
				title.className = 'project-title';
				title.textContent = project.title;
				const desc = document.createElement('div');
				desc.className = 'project-desc';
				desc.textContent = project.description;
				const link = document.createElement('a');
				link.className = 'project-github';
				link.href = project.link;
				link.target = '_blank';
				link.setAttribute('aria-label', 'View on GitHub');
				link.innerHTML = '<i class="fab fa-github"></i>';
				card.appendChild(title);
				card.appendChild(desc);
				card.appendChild(link);
				projectsGrid.appendChild(card);
			});
		}
	}

	if (isStudent) {
		// Get ID from query param
		const params = new URLSearchParams(window.location.search);
		const id = params.get('id');
		const member = getMemberById(id);
		if (!member) {
			window.location.href = 'index.html';
			return;
		}
		populateProfile(member);
	}

	// -----------------------------
	// 4. FADE-IN ON SCROLL
	// -----------------------------
	const fadeEls = document.querySelectorAll('.fade-in-element');
	if ('IntersectionObserver' in window && fadeEls.length) {
		const observer = new IntersectionObserver((entries, obs) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('fade-in');
					obs.unobserve(entry.target);
				}
			});
		}, { threshold: 0.12 });
		fadeEls.forEach(el => observer.observe(el));
	} else {
		// Fallback: show all
		fadeEls.forEach(el => el.classList.add('fade-in'));
	}

	// -----------------------------
	// 5. CLEANUP & MODULARITY
	// -----------------------------
	// (All logic is wrapped in DOMContentLoaded, helpers are modular, no global pollution)
});
