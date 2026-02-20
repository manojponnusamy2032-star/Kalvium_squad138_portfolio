
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
	const isMainPage = !!document.querySelector('.hero-section');
	const navEntry = performance.getEntriesByType('navigation')[0];
	const navType = navEntry ? navEntry.type : (performance.navigation && performance.navigation.type === 1 ? 'reload' : 'navigate');
	const cameFromStudent = sessionStorage.getItem('fromStudent') === 'true';
	const storedScroll = sessionStorage.getItem('mainScrollY');

	if ('scrollRestoration' in history) {
		history.scrollRestoration = 'manual';
	}

	function saveMainScrollPosition() {
		if (!isMainPage) return;
		const y = window.scrollY || window.pageYOffset || 0;
		sessionStorage.setItem('mainScrollY', String(y));
	}

	function restoreMainScrollPosition() {
		if (!isMainPage) return;
		const saved = sessionStorage.getItem('mainScrollY');
		if (saved === null) return;
		const y = parseInt(saved, 10);
		if (Number.isNaN(y)) return;
		const root = document.documentElement;
		const previousBehavior = root.style.scrollBehavior;
		root.style.scrollBehavior = 'auto';
		const applyRestore = () => {
			window.scrollTo(0, y);
			root.scrollTop = y;
			if (document.body) document.body.scrollTop = y;
		};
		applyRestore();
		requestAnimationFrame(() => {
			applyRestore();
			setTimeout(() => {
				applyRestore();
				root.style.scrollBehavior = previousBehavior;
			}, 50);
		});
	}
	
	if (cameFromStudent) {
		sessionStorage.removeItem('fromStudent');
	}

	if (isMainPage && storedScroll !== null) {
		document.body.classList.add('intro-complete');
		if (introOverlay) introOverlay.remove();
	}

	if (isMainPage) {
		window.addEventListener('pageshow', restoreMainScrollPosition);
		window.addEventListener('load', restoreMainScrollPosition, { once: true });
	}
	
	const shouldPlayIntro = navType === 'reload' || (!cameFromStudent && storedScroll === null);
	
	if (introOverlay && introBrand && navBrand && navbar) {
		if (!shouldPlayIntro) {
			introOverlay.remove();
			document.body.classList.add('intro-complete');
			initScrollAnimations();
			initProfileCardClicks();
			restoreMainScrollPosition();
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
				restoreMainScrollPosition();
			}, 600); // 0.6s fade out
			
		}, 3600); // Start fade at 3.6s
	} else {
		// If no intro animation (e.g., page refresh or direct navigation)
		// Initialize features immediately
		document.body.classList.add('intro-complete');
		initScrollAnimations();
		initProfileCardClicks();
		restoreMainScrollPosition();
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
					saveMainScrollPosition();
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
						saveMainScrollPosition();
						sessionStorage.setItem('fromStudent', 'true');
						window.location.href = `student.html?id=${id}`;
					}
				}
			});
		});

		const folksGrid = document.getElementById('folksGrid');
		if (folksGrid) {
			folksGrid.addEventListener('click', (event) => {
				const card = event.target.closest('.folk-card');
				if (!card) return;
				const id = card.getAttribute('data-id');
				if (!id) return;
				saveMainScrollPosition();
				sessionStorage.setItem('fromStudent', 'true');
				window.location.href = `student.html?id=${id}`;
			});
		}
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
			id: 'Program-Manager-Karunakaran',
			name: 'Karunakaran H',
			role: 'Program Manager',
			image: 'https://i.ibb.co/fdx5tJG2/Karunakaran-H-Karunakaran.jpg',
			github:'https://github.com/',
			linkedin: 'https://www.linkedin.com/in/h-karunakaran-3b1285376',
			bio: 'Karunakaran is a dedicated academic professional passionate about student development, technology-driven learning, and building strong campus communities. He focuses on mentoring students in problem solving, discipline, and career readiness. With a commitment to continuous improvement, he works closely with squads to create an environment that encourages creativity, accountability, and practical learning.',
			dream: '',
			skills: [],
			projects: []
		},
		
		// Mentor 1
		{
			id: 'mentor-aravind',
			name: 'Aravind R',
			role: 'Mentor',
			image: 'https://i.ibb.co/JFjMddRh/Aravind-R-2.jpg',
			github: 'https://github.com/Aravindrathenam',
			linkedin: 'https://www.linkedin.com/in/aravind-r-812634245/',
			bio: 'Currently a professional Wait, why is it doing that? investigator at Kalvium. As an Academic Mentor, I spend my days helping students realize that 90% of coding is just staring at a screen until the screen blinks first. I’m part-time debugger, part-time cheerleader, and full-time convinced that the semicolon is the most powerful character in the English language. I don’t just teach people how to code; I teach them how to not throw their laptops out the window.',
            dream: '',
			skills: [],
			projects: []
		},
		
		// Mentor 2
		{
			id: 'mentor-hanuram',
			name: 'Hanuram T',
			role: 'Mentor',
			image: 'https://i.ibb.co/ynQ90dvT/IMG-3197-Hanuram-T.jpg',
			github: 'https://github.com/Mentor-Ram',
			linkedin: 'https://www.linkedin.com/in/hanuram-t',
			bio: 'Academic mentor cum business analyst, balancing logic, data, and good vibes.',
			dream: '',
			skills: [],
			projects: []
		},

		// Mentor 3
		{
			id: 'mentor-santushta',
			name: 'Santushta Iyer A',
			role: 'Mentor',
			image: 'https://i.ibb.co/Kpjj5hNb/shantusta.jpg',
			github: 'https://github.com/santushta',
			linkedin: 'https://www.linkedin.com/in/santushta-iyer-a-99862a25b/',
			bio: 'Dedicated mentor passionate about supporting student growth and fostering a collaborative learning environment.',
			dream: '',
			skills: [],
			projects: []
		},
		// Folks (index.html)
		{
			id: 'folks-aravind-selva-jas-j-s',
			name: 'Aravind Selva Jas J S',
			role: 'Folk',
			image: 'https://i.ibb.co/4nK0j9MH/250310106005-Arvind-selva-Jas-J-S.jpg',
			github: 'https://github.com/arvindselvajas0222-coder',
			linkedin: 'https://www.linkedin.com/in/arvind-selva-jas-j-s-68a79b381/',
			bio: 'I am Aravind Selva Jas J S, a first-year Computer Science student at St. Joseph’s University, Chennai, powered by Kalvium. I am passionate about learning new technologies and building innovative solutions. With a curious mindset and a drive for continuous improvement, I am eager to explore the world of programming and contribute to impactful projects.',
			dream: '',
			skills: [],
			projects: []
		},
		{
			id: 'folks-gkg-arun-ragav',
			name: 'Arun Ragav G.K.G.',
			role: 'Folk',
			image: 'https://i.ibb.co/YnRwkdp/Gemini-Generated-Image-dzecm0dzecm0dzec-Arun-ragav-G-K-G.png',
			github: 'https://github.com/arun-ragav',
			linkedin: 'https://www.linkedin.com/in/arun-ragav-589061384',
			bio: 'Hi, I’m Arun Ragav G.K.G, an aspiring developer passionate about JavaScript, Python, and web development. I enjoy solving problems, building interactive projects, and continuously improving my coding skills. ',
			dream: '',
			skills: [],
			projects: []
		},
		{
			id: 'folks-ashwin-raj',
			name: 'Ashwin Raj',
			role: 'Folk',
			image: 'https://i.ibb.co/Q7xJVTgt/Generated-Image-October-31-2025-10-37-PM-1-Ashwin-Raj.png',
			github: 'https://github.com/Partha1107',
			linkedin: 'https://www.linkedin.com/in/ashwin-raj-002188383?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
			bio: 'My name is Ashwin, and I am currently studying at St. Joseph University. I am very interested in improving my communication skills and becoming more confident in speaking. I enjoy learning programming and exploring new technologies. I always try to develop my skills step by step and work towards becoming a better version of myself.',
			dream: '',
			skills: [],
			projects: []
		},
		{
			id: 'folks-ashwath-palanisamy',
			name: 'Ashwath Palanisamy',
			role: 'Folk',
			image: 'https://i.ibb.co/jmXn5nc/20260217-171252-Ashwath-Palanisamy.jpg',
			github: 'https://github.com/Ashwath-Palanisamy',
			linkedin: 'https://www.linkedin.com/in/ashwathpalanisamy/',
			bio: 'I’m a self‑taught Flutter developer with a passion for learning new technologies and building user‑friendly apps. Skilled in Python, Supabase, and Vercel deployment, I focus on creating secure, scalable solutions while continuously expanding my knowledge. My curiosity drives me to explore modern tools and frameworks to stay ahead in the tech landscape',
			skills: [],
			projects: []
		},
		{
			id: 'folks-chandana-s',
			name: 'Chandana S',
			role: 'Folk',
			image: 'https://i.ibb.co/s767H4c/photo-1-Chandana-E.jpg',
			github: 'https://github.com/chandanaes139-lang',
			linkedin: 'https://www.linkedin.com/in/chandana-elavarasan-a10964384?utm_source=share_via&utm_content=profile&utm_medium=member_android',
			bio: 'I am a responsible and self-motivated individual who is always willing to learn and improve. I believe in continuous growth, both personally and professionally. I am disciplined, adaptable, and capable of handling responsibilities with sincerity. I value honesty, teamwork, and clear communication. I try to approach every task with dedication and a positive attitude. Even when I face challenges, I remain calm and focused on finding solutions rather than giving up. I am currently working on developing my technical and communication skills to become more confident and efficient in my field. My goal is to build a strong career by staying consistent, hardworking, and open to new opportunities.',
			dream: '',
			skills: [],
			projects: []
		},
		{
			id: 'folks-chandru-a',
			name: 'Chandru A',
			role: 'Folk',
			image: 'https://i.ibb.co/Yw2J9S2/Screenshot-20260217-200317-Chandru-A.jpg',
			github: 'https://github.com/chandrua138',
			linkedin: 'https://www.linkedin.com/in/chandru-a-331451384/',
			bio: 'Motivated and dedicated student with a strong commitment to academic excellence and continuous learning. Eager to apply knowledge, develop practical skills, and contribute positively to team environments.',
			dream: '',
			skills: [],
			projects: []
		},
		{
			id: 'folks-chandru-s',
			name: 'Chandru S',
			role: 'Folk',
			image: 'https://i.ibb.co/dwq9RVLf/250310106011-Chandru-S-Chandru-S.jpg',
			github: 'https://github.com/chandru24126',
			linkedin: 'https://www.linkedin.com/in/chandru-sk-999077384',
			bio: 'Hi, I’m Chandru S. I’m someone who believes that every day is a new opportunity to learn and improve. As a first-year college student, I’m exploring new ideas, building my skills, and pushing myself beyond my comfort zone. I enjoy working with others, sharing ideas, and turning challenges into learning experiences. My goal is simple — to grow stronger and better every day',
			skills: [],
			projects: []
		},
		{
			id: 'folks-david-g',
			name: 'David G',
			role: 'Folk',
			image: 'https://i.ibb.co/RT8WXvHL/david-id-image-DAVID-G.jpg',
			github: 'https://github.com/davidgs138-cyber',
			linkedin: 'https://linkedin.com/in/david-g-6bb3323b1',
			bio: 'Hi, I’m David. I’m someone who believes that every day is a new opportunity to learn and improve. As a first-year college student, I’m exploring new ideas, building my skills, and pushing myself beyond my comfort zone. I enjoy working with others, sharing ideas, and turning challenges into learning experiences. My goal is simple — to grow stronger and better every day',
			dream: '',
			skills: [],
			projects: []
		},
		{
			id: 'folks-deboraah-issac-i',
			name: 'Deboraah Issac I',
			role: 'Folk',
			image: 'https://i.ibb.co/7N2mZktZ/Whats-App-Image-2026-02-17-at-14-00-53-Deboraah-Issac-I.jpg',
			github: 'https://github.com/deboraahissacats138-cmyx',
			linkedin: 'https://www.linkedin.com/in/deboraah-issac-ab0813388?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
			bio: 'Hi, I’m Deboraahissac, a first-year college student who’s curious, motivated, and always ready to learn. I enjoy working with others, taking on challenges, and continuously improving myself.',
			dream: '',
			skills: [],
			projects: []
		},
		{
			id: 'folks-deepika-v',
			name: 'Deepika V',
			role: 'Folk',
			image: 'https://i.ibb.co/FL30m2NF/IMG-20250916-WA0037-Deepika-V.jpg',
			github: 'https://github.com/deepikavs138-design',
			linkedin: 'https://www.linkedin.com/in/deepika-v-957099382',
			bio: 'B.Tech CSE Student | Aspiring Software Developer | Passionate About AI & Web Development | Learning, Building, Growing Chennai, Tamil Nadu, India',
			dream: '',
			skills: [],
			projects: []
		},
		{
			id: 'folks-dhinesh-babu',
			name: 'Dhinesh Babu',
			role: 'Folk',
			image: 'https://i.ibb.co/WWcMCst2/DSC-1053-copy-jpg-Dhinesh-Babu.jpg',
			github: 'https://github.com/dhineshbabus138-commit',
			linkedin: 'https://www.linkedin.com/in/dhinesh-babu-software-engg',
			bio: 'I am Dhinesh Babu, a focused and ambitious student who is working hard to build strong technical skills in programming and problem-solving. I care about organizing your life, improving your knowledge step by step, and preparing yourself for a successful future career.',
			dream: '',
			skills: [],
			projects: []
		},
		{
			id: 'folks-dinesh-p',
			name: 'Dinesh P',
			role: 'Folk',
			image: 'https://i.ibb.co/JFnPHszs/IMG-20260125-204551-269-1-Dinesh-P.webp',
			github: 'https://github.com/dineshps138-ds',
			linkedin: 'https://www.linkedin.com/in/dinesh-prakasam-a8279a381?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
			bio: 'Student at St. Joseph University, Palanchur, dedicated to academic growth and professional development.Focused on building a strong foundation in my field within the university\'s vibrant learning environment.Aspiring professional committed to excellence and contributing to the campus community.',
			dream: '',
			skills: [],
			projects: []
		},
		{
			id: 'folks-edupalli-sai-praneeth',
			name: 'Edupalli Sai Praneeth',
			role: 'Folk',
			image: 'https://i.ibb.co/rG7TpZv5/Whats-App-Image-2026-02-18-at-11-03-54-AM-Edupalli-Sai-Praneeth-Lokesh.jpg',
			github: 'https://github.com/edupallilokeshs138-bot',
			linkedin: 'https://www.linkedin.com/in/edupalli-sai-praneeth-3ab348383',
			bio: 'Hi, I’m Sai Praneeth. I am a passionate and curious student who loves learning new technologies. I enjoy coding and building projects using HTML, CSS, JavaScript, and Python. I am always eager to improve my skills and take on new challenges. My goal is to become a successful software developer and create innovative applications.',
			dream: '',
			skills: [],
			projects: []
		},
		{
			id: 'folks-gundla-saigoutham',
			name: 'Gundla Saigoutham',
			role: 'Folk',
			image: 'https://i.ibb.co/PZCHFkBd/Whats-App-Image-2025-10-31-at-10-30-31-fcd3cf49-Gundla-Sai-Gowtham.jpg',
			github: 'https://github.com/gundlagowthams138-cell',
			linkedin: 'https://www.linkedin.com/in/gundla-sai-gowtham-985460390/',
			bio: 'My name is Gundla Sai Gutham. I am a hardworking and dedicated person. I always try to learn new things and improve myself. My goal is to achieve success and make my family proud.',
			dream: '',
			skills: [],
			projects: []
		},
		{
			id: 'folks-haricharan-p',
			name: 'Hari Charan P',
			role: 'Folk',
			image: 'https://i.ibb.co/Q7YNyrKD/photo-Hari-Charan-P.jpg',
			github: 'https://github.com/harips138-droid',
			linkedin: 'https://www.linkedin.com/in/hari-charan-p-5006393b1/',
			bio: 'I’m Haricharan, a focused and determined individual who believes in constant growth. I adapt quickly to new challenges and strive to improve every day. With a positive mindset and strong work ethic, I aim to achieve success.',
			dream: '',
			skills: [],
			projects: []
		},
		{
			id: 'folks-harshini-j',
			name: 'Harshini J',
			role: 'Folk',
			image: 'https://i.ibb.co/N2gwZy1M/IMG-20260218-102709-Harshini-J.jpg',
			github: 'https://github.com/harshinijs138-svg',
			linkedin: 'https://www.linkedin.com/in/harshini-j-244611383?utm_source=share_via&utm_content=profile&utm_medium=member_android',
			bio: 'B.Tech CSE Student @ St. Joseph’s University | Kalvium Program | Aspiring Full-Stack Developer | Passionate about Problem Solving',
			dream: '',
			skills: [],
			projects: []
		},
		{
			id: 'folks-jeevanand-j',
			name: 'Jeevanand J',
			role: 'Folk',
			image: 'https://i.ibb.co/Lh0WD4Wg/IMG-20251116-235142-Jeevanand-Jaisankar.jpg',
			github: 'https://github.com/jeevanand-jaisankar',
			linkedin: 'https://www.linkedin.com/in/jeevanand-j-575676281/',
			bio: 'I’m a CSE student. I’m into building things more than just studying them — electronics projects, hardware-software stuff, racing sim builds. I like figuring out how things work and making them better.',
			dream: '',
			skills: [],
			projects: []
		},
		{
			id: 'folks-karthikeyan',
			name: 'Karthikeyan',
			role: 'Folk',
			image: 'https://i.ibb.co/YBkYNQNb/my-pic-Karthikeyan-A-E.jpg',
			github: 'https://github.com/karthikeyan24-kk',
			linkedin: 'https://www.linkedin.com/in/karthikeyan-a-e-8b3847381/',
			bio: 'Hello, I’m Karthikeyan. I am a first-year college student with a strong passion for learning and developing new skills. I consider myself a committed and responsible individual who works well in teams and enjoys taking on new challenges. I am continuously striving to grow both personally and professionally, and I look forward to gaining more experience and contributing effectively wherever I can.',
			dream: '',
			skills: [],
			projects: []
		},
		{
			id: 'folks-kishore-r',
			name: 'Kishore R',
			role: 'Folk',
			image: 'https://i.ibb.co/5WSjXssD/Whats-App-Image-2026-02-17-at-18-55-50-Kishore-R.jpg',
			github: 'https://github.com/kishorers138-cyber',
			linkedin: 'https://www.linkedin.com/in/kishore-r-6bb4a6383/',
			bio: 'I am a friendly and hardworking person. I always try to learn new things and improve myself.',
			dream: '',
			skills: [],
			projects: []
		},
		{
			id: 'folks-manoj-kumar-p',
			name: 'Manoj Kumar P',
			role: 'Folk',
			image: 'https://i.ibb.co/fz17Bkt3/Screenshot-2026-02-17-125857-Manoj-Kumar-Ponnusamy.png',
			github: 'https://github.com/manojponnusamy2032-star',
			linkedin: 'https://www.linkedin.com/in/manoj-kumar-p-621049386',
			bio: 'I am a dedicated learner focused on building strong fundamentals and practical skills in software development.',
			dream: '',
			skills: [],
			projects: []
		},
		{
			id: 'folks-mohammed-tharik-s',
			name: 'Mohammed Tharik S',
			role: 'Folk',
			image: 'https://i.ibb.co/9HKsvTRR/id-card-Mohammed-Tharik-S.jpg',
			github: 'https://github.com/MohammedTharikS',
			linkedin: 'https://www.linkedin.com/in/mohammed-tharik-s-26b108384?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
			bio: 'Motivated and detail-oriented professional committed to excellence.Always eager to learn, adapt, and contribute effectively to meaningful projects.',
			dream: '',
			skills: [],
			projects: []
		},
		{
			id: 'folks-m-ram-charan',
			name: 'M Ram Charan',
			role: 'Folk',
			image: 'https://i.ibb.co/nqv8mN9z/Whats-App-Image-2026-02-17-at-8-49-37-PM-Medaboina-Ram-Charan.jpg',
			github: 'https://github.com/medaboinacharan-pixel',
			linkedin: 'https://www.linkedin.com/in/ram-charan-b551133ab/',
			bio: 'I am an editor.I turn the raw footage into emotional stories',
			dream: '',
			skills: [],
			projects: []
		},
		{
			id: 'folks-navya-d',
			name: 'Navya D',
			role: 'Folk',
			image: 'https://i.ibb.co/xTstHjX/IMG-20260218-011209-Navya-D.jpg',
			github: 'https://github.com/navyads138-star',
			linkedin: 'https://www.linkedin.com/in/navya-d-a1b187383?utm_source=share_via&utm_content=profile&utm_medium=member_android',
			bio: 'I am Navya, a B.Tech CSE (Applied AI) student at St. Joseph University, powered by Kalvium, with my schooling completed at Sri Chaitanya Techno School. Passionate about combining creativity with technology, I bring a curious mindset that drives me to learn, explore, and solve real-world problems through innovative AI-driven solutions.',
			dream: '',
			skills: [],
			projects: []
		},
		{
			id: 'folks-n-sherly',
			name: 'N Sherly',
			role: 'Folk',
			image: 'https://i.ibb.co/n8Ydcd1R/IMG-20260217-164402-1-Sherly-N.jpg',
			github: 'https://github.com/sherlyns138-crypto',
			linkedin: 'https://www.linkedin.com/in/sherly-n-407881382/',
			bio: 'First-Year B. Tech CSE Student, Aspiring Software Developer, Eager to Learn, Solve & Build. Computer Science Undergraduate, Exploring Coding, AI & Web Development',
			dream: '',
			skills: [],
			projects: []
		},
		{
			id: 'folks-nithyanandharaj-m',
			name: 'Nithyanandharaj M',
			role: 'Folk',
			image: 'https://i.ibb.co/Q3Fn3KBd/IMG-20260217-145330-Nithyanandharaj-M.jpg',
			github: 'https://github.com/nithyanandharajms138-debug',
			linkedin: 'https://www.linkedin.com/in/nithyanandharaj-m-728189383',
			bio: 'I am a first-year Computer Science student at Kalvium (St. Joseph’s University, Chennai), passionate about solving problems and building solutions through technology. I enjoy coding and have been learning Python, Java and JavaScript to strengthen my programming skills.I see myself as a creative thinker and logical problem solver who loves taking on challenges that require innovative solutions. ',
			dream: '',
			skills: [],
			projects: []
		},
		{
			id: 'folks-pradheesh-s',
			name: 'Pradheesh S',
			role: 'Folk',
			image: 'https://i.ibb.co/F46Fr5FB/Benjamin-Pradheesh-S.jpg',
			github: 'https://github.com/pradheesh08-s',
			linkedin: 'https://www.linkedin.com/in/pradheesh-s-a7a7a0381/',
			bio: '"I am a First-Year B.Tech student at Kalvium with a strong interest in technology and cybersecurity. As a beginner in cybersecurity, I am actively learning the fundamentals of network security, ethical hacking, and system protection.I am passionate about understanding how systems work and how to secure them against vulnerabilities and threats. Currently, I am building my programming skills and exploring concepts like encryption, secure coding practices, and digital safety.My goal is to grow into a skilled cybersecurity professional who can help organizations protect their data and infrastructure. I am always eager to learn, experiment, and improve my technical skills.',
			dream: '',
			skills: [],
			projects: []
		},
		{
			id: 'folks-prasanna-kumar-a',
			name: 'Prasanna Kumar A',
			role: 'Folk',
			image: 'https://i.ibb.co/HfBSScKZ/20260112-122625-1-Prasanna-Kumar-A.jpg',
			github: 'https://github.com/prasannaas138-alt',
			linkedin: 'https://www.linkedin.com/in/prasanna-kumar-a0a055384?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
			bio: 'Hi, I’m Prasanna Kumar, a passionate programmer with a strong interest in Python and Artificial Intelligence. I enjoy solving problems, building projects, and exploring how AI can be used to create smart and useful applications.I am continuously learning and improving my skills in Python and AI, and I love turning ideas into real-world solutions through code. My goal is to grow as an AI developer and contribute to innovative and impactful technology.',
			dream: '',
			skills: [],
			projects: []

		},
		{
			id: 'folks-purushothaman-k',
			name: 'Purushothaman K',
			role: 'Folk',
			image: 'https://i.ibb.co/B52Vd8x8/ph-PURUSHOTHAMAN-K.jpg',
			github: 'https://github.com/purushothaman2307',
			linkedin: 'https://www.linkedin.com/in/purushothaman-k-82129a325?utm_source=share_via&utm_content=profile&utm_medium=member_android',
			bio: 'My hobby is sports and Iam studying in B.Tech CSE Applied AI in St Joseph University',
			dream: '',
			skills: [],
			projects: []
		},
		{
			id: 'folks-sandeep-v',
			name: 'Sandeep V',
			role: 'Folk',
			image: 'https://i.ibb.co/WNyZR8J4/2026-02-17-Sandeep-V.jpg',
			github: 'https://github.com/sandeepvs138-dev',
			linkedin: 'https://www.linkedin.com/in/sandeep-v-947063384/',
			bio: 'My goal is to build a successful career and continue growing both personally and professionally.',
			dream: '',
			skills: [],
			projects: []
		},
		{
			id: 'folks-sanjay-chelliah',
			name: 'Sanjay Chelliah',
			role: 'Folk',
			image: 'https://i.ibb.co/WNC3Kxjq/unnamed-Sanjay-Chelliah.jpg',
			github: 'https://github.com/SanCheS138',
			linkedin: 'https://www.linkedin.com/in/sanjay-c-606981384',
			bio: 'I tend to show up quietly, like I was already there before anyone noticed. I say normal things, but there’s usually something slightly off about the timing. I enjoy silence, late hours, and watching the world do its strange little routines. Sometimes I feel like I’m just passing through, taking mental notes for no clear reason. If you ask what I’m thinking, I might say “nothing”… but if you listen closely, you might hear me mumble a certain number more than once.',
			dream: '',
			skills: [],
			projects: []
		},
		{
			id: 'folks-sasi-mahesh',
			name: 'Sasi Mahesh',
			role: 'Folk',
			image: 'https://i.ibb.co/sdp5QWCt/IMG-20251229-210000-Sasi-Mahesh.png',
			github: '',
			linkedin: 'https://www.linkedin.com/in/sasi-mahesh-2aa3b4384?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
			bio: '"Hi, I’m Sasi Mahesh a curious and driven first-year college student who believes growth begins where comfort ends. I’m passionate about learning new concepts, especially in technology, and constantly look for ways to sharpen my skills and think differently. I enjoy collaborating with people, brainstorming ideas, and solving problems that push me to think deeper.',
			dream: '',
			skills: [],
			projects: []
		},
		{
			id: 'folks-shree-vidhya-t',
			name: 'Shree Vidhya T',
			role: 'Folk',
			image: 'https://i.ibb.co/8gYP0vD5/Screenshot-20251031-085922-Whats-App-2-Shree-Vidhya-T.jpg',
			github: 'https://github.com/shreevidhyats138-cmyk',
			linkedin: 'https://www.linkedin.com/in/shree-v-5a60a0382?utm_source=share_via&utm_content=profile&utm_medium=member_android',
			bio: 'Hi, I’m Shree Vidhya. I’m currently a first-year college student who is passionate about learning and improving my skills. I’m a dedicated and responsible person who enjoys teamwork and taking on new challenges. I’m always eager to grow both personally and professionally.',
			dream: '',
			skills: [],
			projects: []
		},
		{
			id: 'folks-surjith-sri-k',
			name: 'Surjith Sri K',
			role: 'Folk',
			image: 'https://i.ibb.co/NdGgkR66/passport-size-photo-Surjith-Sri-K.jpg',
			github: 'https://github.com/surjithks138',
			linkedin: 'https://kalvium.community/',
			bio: 'Hi, I’m Surjith Sri. I’m a student who loves technology and problem-solving. I’m currently preparing for a career as a software engineer and spending time learning Python and development skills.',
			dream: '',
			skills: [],
			projects: []
		},
		{
			id: 'folks-tavanidhiragavi-b-b',
			name: 'Tavanidhiragavi B B',
			role: 'Folk',
			image: 'https://i.ibb.co/2YMJq3hS/RAGAVI-Tavanidhiragavi-B-B.jpg',
			github: 'https://github.com/tavanidhiragavibbs138-rgb',
			linkedin: 'https://www.linkedin.com/in/tavanidhiragavi-b-b-0068b03a2?utm_source=share_via&utm_content=profile&utm_medium=member_android',
			bio: 'I am focused on learning, building, and growing as a software developer',
			dream: '',
			skills: [],
			projects: []
		},
		{
			id: 'folks-udhaya-e',
			name: 'Udhaya E',
			role: 'Folk',
			image: 'https://i.ibb.co/ym7w9FpD/udhaya-Udhaya-E.jpg',
			github: 'https://github.com/udhayaes138-spec',
			linkedin: 'https://www.linkedin.com/in/udhaya-e-a1b443383/',
			bio: 'I am a first-year student who is passionate about learning new technologies and improving my skills.I have a strong interest in programming and web development.I enjoy solving problems and working on creative projects.I am always eager to learn, grow, and take on new challenges.My goal is to build a successful career in the technology field.',
            dream: '',
			skills: [],
			projects: []
		},
		{
			id: 'folks-vignesh-m',
			name: 'Vignesh M',
			role: 'Folk',
			image: 'https://i.ibb.co/272Z8T7q/Screenshot-2026-02-17-130437-Vignesh-M.png',
			github: 'https://github.com/vigneshms138-creator',
			linkedin: 'https://www.linkedin.com/in/vignesh-m-2b1690383?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
			bio: 'I am a first-year Computer Science student at Kalvium, passionate about learning and growing in the field of technology. I enjoy coding, problem-solving, and exploring new technologies. My goal is to build a successful career as a software developer and contribute to innovative projects.',
			dream: '',
			skills: [],
			projects: []
		},
		
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

	const fallbackAvatar = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23181818"/><circle cx="100" cy="78" r="34" fill="%23730c1e"/><rect x="48" y="122" width="104" height="52" rx="26" fill="%23730c1e"/></svg>';

	// Helper: Render a mentor or folk card
	function renderCard(member, cardType = 'folk') {
		const card = document.createElement('div');
		card.className = cardType === 'mentor' ? 'mentor-card fade-in-element' : 'folk-card fade-in-element';
		if (cardType === 'mentor' && (member.role === 'Main Mentor' || member.role === 'Program Manager')) card.classList.add('mentor-main');
		if (cardType === 'mentor' && member.role === 'Mentor') card.classList.add('mentor-secondary');
		if (cardType === 'folk') card.tabIndex = 0;
		// Image
		const img = document.createElement('div');
		img.className = cardType === 'mentor' ? 'mentor-photo' : 'folk-photo';
		if (cardType === 'mentor' && (member.role === 'Main Mentor' || member.role === 'Program Manager')) img.classList.add('mentor-photo-main');
        
        const imageElement = document.createElement('img');
        imageElement.src = member.image;
        imageElement.alt = member.name;
        imageElement.style.width = '100%';
        imageElement.style.height = '100%';
        imageElement.style.objectFit = 'cover';
        imageElement.style.borderRadius = '50%';
		imageElement.loading = 'lazy';
		imageElement.onerror = () => {
			imageElement.onerror = null;
			imageElement.src = fallbackAvatar;
		};
        img.appendChild(imageElement);

		img.setAttribute('aria-label', member.name);
		// Name
		const name = document.createElement('div');
		name.className = cardType === 'mentor' ? 'mentor-name' : 'folk-name';
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
			saveMainScrollPosition();
			sessionStorage.setItem('fromStudent', 'true');
			window.location.href = `student.html?id=${member.id}`;
		});
		card.addEventListener('keypress', e => {
			if (e.key === 'Enter' || e.key === ' ') {
				saveMainScrollPosition();
				sessionStorage.setItem('fromStudent', 'true');
				window.location.href = `student.html?id=${member.id}`;
			}
		});

		return card;
	}

	if (isIndex) {
		// Render mentors
		const mentorsGrid = document.querySelector('.mentors-grid');
		const folksGrid = document.getElementById('folksGrid');
		const allFolks = squadMembers
			.filter(m => m.role === 'Folk')
			.sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));

		function renderFolksRows(folks) {
			if (!folksGrid) return;
			folksGrid.innerHTML = '';

			if (!folks.length) {
				const emptyState = document.createElement('div');
				emptyState.className = 'folks-row folks-empty-row';

				const message = document.createElement('div');
				message.className = 'folks-empty-state';
				message.textContent = 'No Folks Found';
				emptyState.appendChild(message);
				folksGrid.appendChild(emptyState);
				return;
			}

			for (let index = 0; index < folks.length; index += 4) {
				const row = document.createElement('div');
				row.className = 'folks-row';
				folks.slice(index, index + 4).forEach(folk => {
					row.appendChild(renderCard(folk, 'folk'));
				});
				folksGrid.appendChild(row);
			}
		}

		if (mentorsGrid) {
			// Main mentor
			const mainMentor = squadMembers.find(m => m.role === 'Program Manager');
			const mentors = squadMembers.filter(m => m.role === 'Mentor');
			mentorsGrid.innerHTML = '';
			if (mainMentor) mentorsGrid.appendChild(renderCard(mainMentor, 'mentor'));
			mentors.forEach(mentor => mentorsGrid.appendChild(renderCard(mentor, 'mentor')));
		}

		// Render folks
		renderFolksRows(allFolks);

		// Search filter
		const searchInput = document.getElementById('searchInput');
		if (searchInput && folksGrid) {
			searchInput.addEventListener('input', e => {
				const normalize = (value) => (value || '').toLowerCase().trim().replace(/\s+/g, ' ');
				const val = normalize(e.target.value);
				const filteredFolks = allFolks.filter(folk => normalize(folk.name).includes(val));
				renderFolksRows(filteredFolks);
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
			img.onerror = () => {
				img.onerror = null;
				img.src = fallbackAvatar;
			};
		}
		const name = document.getElementById('profileName');
		if (name) name.textContent = member.name;
		const role = document.getElementById('profileRole');
		if (role) role.textContent = member.role;
		const github = document.getElementById('profileGithub');
		if (github) {
			if (member.role === 'Program Manager') {
				github.style.display = 'none';
			} else {
				github.href = member.github;
			}
		}
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
