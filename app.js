
// =============================
// Squad 138 – Elite Developer Fellowship
// Modular App JS
// =============================

document.addEventListener('DOMContentLoaded', () => {
	if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
		const introLogo = document.querySelector(".logo-intro");
		const introContainer = document.querySelector(".logo-intro-container");
		if (introLogo) {
			setTimeout(() => {
				introLogo.classList.add("animate");
			}, 500);
			setTimeout(() => {
				introContainer.style.opacity = "0";
				introContainer.style.transition = "opacity 0.8s ease";
				setTimeout(() => {
					introContainer.remove();
				}, 800);
			}, 3200);
		}
	}
	// LOGO INTRO ANIMATION
	const overlay = document.getElementById('logo-intro-overlay');
	if (overlay) {
		setTimeout(() => {
			overlay.style.opacity = '0';
			setTimeout(() => overlay.style.display = 'none', 900);
		}, 1800);
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

	// Static HTML card click handler
	document.querySelectorAll('.mentor-card, .folk-card').forEach(card => {
		card.addEventListener('click', () => {
			const id = card.getAttribute('data-id');
			if (id) window.location.href = `student.html?id=${id}`;
		});
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
