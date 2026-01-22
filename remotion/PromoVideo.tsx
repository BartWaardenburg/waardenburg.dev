import {
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
	interpolate,
	spring,
	Img,
	staticFile,
} from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { loadFont } from '@remotion/google-fonts/Recursive';

// Load Recursive font - the exact same as the website
const { fontFamily } = loadFont('normal', {
	weights: ['400', '500', '600', '700', '800'],
	subsets: ['latin'],
});

// ============================================
// EXACT CONTENT FROM src/app/page.tsx
// ============================================

const heroContent = {
	greeting: "Hello. I'm Bart.",
	taglines: [
		'Full-stack developer. Front-end expert.',
		'Sometimes tech lead, sometimes deep in the code.',
	],
	statement: 'I build things that work well for the people using them.',
};

const marquees = {
	work: 'BUILDING PRODUCTS THAT MATTER',
	about: 'FROM CODE TO LEADERSHIP',
	contact: "LET'S BUILD SOMETHING TOGETHER",
};

const projects = [
	{
		title: 'Leveret',
		subtitle: 'Precision Tools for Trail Runners',
		image: 'images/projects/leveret-hero.png',
		quote: 'Leveret treats trail running like the technical discipline it is.',
		stack: ['Next.js 16', 'React 19', 'tRPC', 'Drizzle'],
	},
	{
		title: 'Zeeuws Museum',
		subtitle: 'Digital Experience',
		image: 'images/projects/zeeuwsmuseum-hero.png',
		quote: 'Where centuries of Zeeland history meet modern web performance.',
		stack: ['Next.js 15', 'React 19', 'Algolia', 'Motion'],
	},
	{
		title: 'Amictus.ai',
		subtitle: 'Custom AI Solutions',
		image: 'images/projects/amictus-hero.png',
		quote: 'AI as powerful support for people and processes.',
		stack: ['Next.js 15', 'React 19', 'AI SDK', 'Zod'],
	},
	{
		title: 'SDU',
		subtitle: 'Legal Publishing Platform',
		image: 'images/projects/sdu-hero.png',
		quote: 'Complex information architecture for professionals.',
		stack: ['React', 'Apollo', 'GraphQL', 'Contentful'],
	},
];

const services = [
	{
		title: 'Tech Lead',
		description:
			'Leading teams, architecture decisions, code reviews, mentoring. Have scaled engineering teams up to 40 developers across multiple squads.',
		quote: 'Good leadership is about making yourself unnecessary.',
		keywords: ['Architecture', 'Mentoring', 'Scale'],
	},
	{
		title: 'Full-Stack Development',
		description:
			'React, Next.js, TypeScript on the front. Node, APIs and headless CMS on the back. Whatever fits the problem.',
		quote: 'The stack should serve the product, not the other way around.',
		keywords: ['React', 'TypeScript', 'Node'],
	},
	{
		title: 'Design Systems',
		description:
			'Component libraries that scale. Documentation that developers actually read. Keeping things consistent across teams.',
		quote: 'A good design system is invisible until you need it.',
		keywords: ['Components', 'Tokens', 'Scale'],
	},
	{
		title: 'Consulting',
		description:
			'Technical audits. Stack decisions. Team assessments. Helping organizations understand where they are and where they could be.',
		quote: 'Sometimes the best code is the code you decide not to write.',
		keywords: ['Audits', 'Strategy', 'Growth'],
	},
];

// ============================================
// EXACT COLORS FROM globals.css
// ============================================

const colors = {
	neutral: {
		50: '#fafafa',
		100: '#f5f5f5',
		200: '#e5e5e5',
		300: '#d4d4d4',
		400: '#a3a3a3',
		500: '#737373',
		600: '#525252',
		700: '#404040',
		800: '#262626',
		900: '#171717',
		950: '#0a0a0a',
	},
	amber: {
		50: '#fffbeb',
		900: '#78350f',
	},
};

// ============================================
// BACKGROUND GRID - exact same as website
// ============================================

function BackgroundGrid({ dark = true }: { dark?: boolean }) {
	const color = dark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)';
	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				backgroundImage: `
					repeating-linear-gradient(0deg, transparent, transparent 79px, ${color} 79px, ${color} 80px),
					repeating-linear-gradient(90deg, transparent, transparent 79px, ${color} 79px, ${color} 80px)
				`,
			}}
		/>
	);
}

// ============================================
// ANIMATED GEOMETRIC LINES
// ============================================

function AnimatedLines({ frame, fps }: { frame: number; fps: number }) {
	const lines = [
		{ x1: -100, y1: 200, x2: 600, y2: 400, delay: 0 },
		{ x1: 1920, y1: 300, x2: 1200, y2: 150, delay: 5 },
		{ x1: -100, y1: 800, x2: 800, y2: 600, delay: 10 },
		{ x1: 1920, y1: 700, x2: 1400, y2: 900, delay: 8 },
		{ x1: 400, y1: -50, x2: 600, y2: 400, delay: 12 },
		{ x1: 1500, y1: 1100, x2: 1300, y2: 500, delay: 15 },
	];

	return (
		<svg
			style={{
				position: 'absolute',
				inset: 0,
				width: '100%',
				height: '100%',
			}}
		>
			{lines.map((line, i) => {
				const progress = spring({
					frame: frame - line.delay,
					fps,
					config: { damping: 30, stiffness: 80 },
				});

				const length = Math.sqrt(
					Math.pow(line.x2 - line.x1, 2) + Math.pow(line.y2 - line.y1, 2),
				);
				const dashOffset = interpolate(progress, [0, 1], [length, 0]);

				return (
					<line
						key={i}
						x1={line.x1}
						y1={line.y1}
						x2={line.x2}
						y2={line.y2}
						stroke="rgba(250, 250, 250, 0.08)"
						strokeWidth={1}
						strokeDasharray={length}
						strokeDashoffset={dashOffset}
					/>
				);
			})}
		</svg>
	);
}

// ============================================
// FLOATING PARTICLES
// ============================================

function FloatingParticles({ frame }: { frame: number }) {
	const particles = [
		{ x: 150, y: 200, size: 4, speed: 0.02 },
		{ x: 1700, y: 150, size: 6, speed: 0.025 },
		{ x: 300, y: 800, size: 3, speed: 0.03 },
		{ x: 1600, y: 750, size: 5, speed: 0.022 },
		{ x: 900, y: 100, size: 4, speed: 0.028 },
		{ x: 1100, y: 900, size: 3, speed: 0.018 },
		{ x: 500, y: 500, size: 2, speed: 0.035 },
		{ x: 1400, y: 400, size: 4, speed: 0.02 },
	];

	return (
		<>
			{particles.map((p, i) => {
				const floatY = interpolate(
					Math.sin(frame * p.speed + i * 2),
					[-1, 1],
					[-20, 20],
				);
				const floatX = interpolate(
					Math.cos(frame * p.speed * 0.7 + i),
					[-1, 1],
					[-10, 10],
				);
				const opacity = interpolate(
					Math.sin(frame * 0.05 + i),
					[-1, 1],
					[0.1, 0.3],
				);

				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: p.x + floatX,
							top: p.y + floatY,
							width: p.size,
							height: p.size,
							borderRadius: '50%',
							backgroundColor: colors.neutral[50],
							opacity,
						}}
					/>
				);
			})}
		</>
	);
}

// ============================================
// HERO SCENE - DRAMATICALLY COOLER
// ============================================

function HeroScene() {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Text reveal with 3D rotation and scale - starts immediately
	const getLetterAnimation = (index: number) => {
		const progress = spring({
			frame: frame - index * 1.5,
			fps,
			config: { damping: 15, stiffness: 150 },
		});

		return {
			y: interpolate(progress, [0, 1], [100, 0]),
			rotateX: interpolate(progress, [0, 1], [-90, 0]),
			scale: interpolate(progress, [0, 1], [0.5, 1]),
			opacity: interpolate(progress, [0, 1], [0, 1]),
		};
	};

	// Taglines with sweep reveal - faster timing
	const tagline1Progress = spring({
		frame: frame - 25,
		fps,
		config: { damping: 20, stiffness: 100 },
	});
	const tagline2Progress = spring({
		frame: frame - 40,
		fps,
		config: { damping: 20, stiffness: 100 },
	});
	const statementProgress = spring({
		frame: frame - 60,
		fps,
		config: { damping: 20, stiffness: 100 },
	});

	// Horizontal line that sweeps across
	const lineProgress = spring({
		frame: frame - 10,
		fps,
		config: { damping: 30, stiffness: 80 },
	});
	const lineWidth = interpolate(lineProgress, [0, 1], [0, 1200]);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: colors.neutral[950],
				perspective: 1000,
			}}
		>
			<BackgroundGrid dark />
			<AnimatedLines frame={frame} fps={fps} />
			<FloatingParticles frame={frame} />

			{/* Animated accent line */}
			<div
				style={{
					position: 'absolute',
					top: 540,
					left: 96,
					height: 1,
					width: lineWidth,
					background: `linear-gradient(90deg, ${colors.neutral[50]}40, transparent)`,
				}}
			/>

			{/* Main hero content */}
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					padding: '0 96px',
					height: '100%',
					maxWidth: 1200,
					perspective: 800,
				}}
			>
				{/* Greeting - 3D letter animation */}
				<h1
					style={{
						fontFamily,
						fontSize: 96,
						fontWeight: 500,
						color: colors.neutral[50],
						marginBottom: 48,
						lineHeight: 1.1,
						fontVariationSettings: "'MONO' 1, 'CASL' 1",
						transformStyle: 'preserve-3d',
					}}
				>
					{heroContent.greeting.split('').map((letter, i) => {
						const anim = getLetterAnimation(i);

						return (
							<span
								key={i}
								style={{
									display: 'inline-block',
									transform: `translateY(${anim.y}px) rotateX(${anim.rotateX}deg) scale(${anim.scale})`,
									opacity: anim.opacity,
									transformStyle: 'preserve-3d',
								}}
							>
								{letter === ' ' ? '\u00A0' : letter}
							</span>
						);
					})}
				</h1>

				{/* Taglines with slide + fade */}
				<div style={{ maxWidth: 900 }}>
					<p
						style={{
							fontFamily,
							fontSize: 32,
							color: colors.neutral[300],
							marginBottom: 24,
							lineHeight: 1.6,
							fontVariationSettings: "'MONO' 1, 'CASL' 1",
							opacity: tagline1Progress,
							transform: `translateX(${interpolate(tagline1Progress, [0, 1], [-50, 0])}px)`,
						}}
					>
						{heroContent.taglines[0]}
					</p>
					<p
						style={{
							fontFamily,
							fontSize: 32,
							color: colors.neutral[300],
							marginBottom: 32,
							lineHeight: 1.6,
							fontVariationSettings: "'MONO' 1, 'CASL' 1",
							opacity: tagline2Progress,
							transform: `translateX(${interpolate(tagline2Progress, [0, 1], [-50, 0])}px)`,
						}}
					>
						{heroContent.taglines[1]}
					</p>
					<p
						style={{
							fontFamily,
							fontSize: 32,
							color: colors.neutral[50],
							lineHeight: 1.6,
							fontVariationSettings: "'MONO' 1, 'CASL' 1",
							opacity: statementProgress,
							transform: `translateX(${interpolate(statementProgress, [0, 1], [-50, 0])}px) scale(${interpolate(statementProgress, [0, 1], [0.95, 1])})`,
						}}
					>
						{heroContent.statement}
					</p>
				</div>
			</div>

			{/* Corner decorations that draw in */}
			<CornerDecorations frame={frame} fps={fps} />
		</AbsoluteFill>
	);
}

// ============================================
// CORNER DECORATIONS
// ============================================

function CornerDecorations({ frame, fps }: { frame: number; fps: number }) {
	const progress = spring({
		frame: frame - 20,
		fps,
		config: { damping: 30, stiffness: 80 },
	});

	const lineLength = interpolate(progress, [0, 1], [0, 120]);
	const opacity = interpolate(progress, [0, 1], [0, 0.3]);

	return (
		<>
			{/* Top right */}
			<div style={{ position: 'absolute', top: 60, right: 60 }}>
				<div
					style={{
						position: 'absolute',
						top: 0,
						right: 0,
						width: lineLength,
						height: 2,
						backgroundColor: colors.neutral[50],
						opacity,
					}}
				/>
				<div
					style={{
						position: 'absolute',
						top: 0,
						right: 0,
						width: 2,
						height: lineLength,
						backgroundColor: colors.neutral[50],
						opacity,
					}}
				/>
			</div>
			{/* Bottom left */}
			<div style={{ position: 'absolute', bottom: 60, left: 60 }}>
				<div
					style={{
						position: 'absolute',
						bottom: 0,
						left: 0,
						width: lineLength,
						height: 2,
						backgroundColor: colors.neutral[50],
						opacity,
					}}
				/>
				<div
					style={{
						position: 'absolute',
						bottom: 0,
						left: 0,
						width: 2,
						height: lineLength,
						backgroundColor: colors.neutral[50],
						opacity,
					}}
				/>
			</div>
		</>
	);
}

// ============================================
// MARQUEE SCENE - FASTER, FULLY READABLE
// ============================================

function MarqueeScene({
	text,
	invert = false,
}: {
	text: string;
	invert?: boolean;
}) {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Colors match exactly
	const bgColor = invert ? colors.amber[50] : colors.neutral[900];
	const textColor = invert ? colors.amber[900] : colors.neutral[50];
	const strokeColor = invert
		? 'rgba(120, 53, 15, 0.25)'
		: 'rgba(255, 255, 255, 0.3)';

	// FASTER scroll - complete the full text scroll in the scene duration
	// Start from right edge, scroll to left until text is fully visible then exits left
	const scrollProgress = interpolate(frame, [0, 60], [0, 1], {
		extrapolateRight: 'clamp',
	});
	// Offset: start at 100vw (off-screen right), end at negative to scroll off left
	// Text width is roughly 4000px for these long phrases
	const offset = interpolate(scrollProgress, [0, 1], [0, 4500]);

	// Scale in quickly
	const scaleProgress = spring({
		frame,
		fps,
		config: { damping: 200 },
	});

	return (
		<AbsoluteFill style={{ backgroundColor: bgColor, overflow: 'hidden' }}>
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: 0,
					right: 0,
					transform: `scale(${scaleProgress})`,
				}}
			>
				{/* Stroke text - offset vertically, different speed (1.15x) */}
				<div
					style={{
						position: 'absolute',
						left: 0,
						whiteSpace: 'nowrap',
						transform: `translateX(calc(100vw - ${offset * 1.15}px)) translateY(-80%)`,
					}}
				>
					<span
						style={{
							fontFamily,
							fontSize: 192,
							fontWeight: 700,
							color: 'transparent',
							WebkitTextStroke: `2px ${strokeColor}`,
							letterSpacing: '-0.05em',
							fontVariationSettings: "'MONO' 1, 'CASL' 0, 'slnt' -15",
						}}
					>
						{text}
					</span>
				</div>

				{/* Solid text */}
				<div
					style={{
						position: 'absolute',
						left: 0,
						whiteSpace: 'nowrap',
						transform: `translateX(calc(100vw - ${offset}px)) translateY(-50%)`,
					}}
				>
					<span
						style={{
							fontFamily,
							fontSize: 192,
							fontWeight: 700,
							color: textColor,
							letterSpacing: '-0.05em',
							fontVariationSettings: "'MONO' 1, 'CASL' 0, 'slnt' -15",
						}}
					>
						{text}
					</span>
				</div>
			</div>
		</AbsoluteFill>
	);
}

// ============================================
// PROJECTS SCENE - CINEMATIC 3D FLY-THROUGH
// ============================================

function ProjectsScene() {
	const frame = useCurrentFrame();

	// Camera movement through the scene - SLOWER continuous forward motion
	// Spread over 240 frames for more time to read
	const cameraZ = interpolate(frame, [0, 240], [0, 2400], {
		extrapolateRight: 'clamp',
	});

	// Slight camera sway for cinematic feel
	const cameraSway = interpolate(Math.sin(frame * 0.025), [-1, 1], [-25, 25]);
	const cameraVertical = interpolate(
		Math.sin(frame * 0.02),
		[-1, 1],
		[-15, 15],
	);

	// Title fades in and then out as camera moves
	const titleOpacity = interpolate(frame, [0, 20, 60, 90], [0, 1, 1, 0], {
		extrapolateRight: 'clamp',
	});

	// Position screenshots in 3D space along the Z axis - spread further apart
	const screenshotPositions = [
		{ z: 400, x: -280, y: -80, rotateY: 12, rotateX: -3 },
		{ z: 1000, x: 320, y: 40, rotateY: -15, rotateX: 4 },
		{ z: 1600, x: -260, y: -40, rotateY: 18, rotateX: -5 },
		{ z: 2200, x: 280, y: 60, rotateY: -12, rotateX: 3 },
	];

	return (
		<AbsoluteFill
			style={{
				backgroundColor: colors.neutral[950],
				overflow: 'hidden',
			}}
		>
			<BackgroundGrid dark />

			{/* Animated speed lines for motion feel */}
			<SpeedLines frame={frame} />

			{/* 3D scene container */}
			<div
				style={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					perspective: 1200,
					perspectiveOrigin: '50% 50%',
				}}
			>
				{/* Camera rig */}
				<div
					style={{
						position: 'absolute',
						width: '100%',
						height: '100%',
						transformStyle: 'preserve-3d',
						transform: `
							translateZ(${cameraZ}px)
							translateX(${cameraSway}px)
							translateY(${cameraVertical}px)
						`,
					}}
				>
					{/* Screenshots flying past in 3D */}
					{projects.map((project, i) => {
						const pos = screenshotPositions[i];
						const relativeZ = pos.z - cameraZ;

						// Calculate visibility - show when in front of camera, hide when passed
						const isVisible = relativeZ > -500 && relativeZ < 1500;
						const opacity = interpolate(
							relativeZ,
							[-300, 0, 800, 1200],
							[0, 1, 1, 0],
							{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
						);

						// Scale based on distance (perspective)
						const scale = interpolate(relativeZ, [0, 600], [1.2, 0.6], {
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						});

						// Dynamic rotation as it passes
						const dynamicRotateY =
							pos.rotateY +
							interpolate(relativeZ, [-300, 0, 600], [-30, 0, 0], {
								extrapolateLeft: 'clamp',
								extrapolateRight: 'clamp',
							});

						if (!isVisible) return null;

						return (
							<div
								key={project.title}
								style={{
									position: 'absolute',
									left: '50%',
									top: '50%',
									transformStyle: 'preserve-3d',
									transform: `
										translateX(${pos.x - 280}px)
										translateY(${pos.y - 180}px)
										translateZ(${-pos.z}px)
										rotateY(${dynamicRotateY}deg)
										rotateX(${pos.rotateX}deg)
										scale(${scale})
									`,
									opacity,
								}}
							>
								{/* Screenshot card with CardFrame styling */}
								<div style={{ position: 'relative', width: 560 }}>
									{/* Outer decorative border */}
									<div
										style={{
											position: 'absolute',
											inset: -12,
											borderRadius: 20,
											border: '2px solid rgba(250, 250, 250, 0.1)',
										}}
									/>
									{/* Inner accent line */}
									<div
										style={{
											position: 'absolute',
											inset: -6,
											borderRadius: 16,
											border: '1px solid rgba(250, 250, 250, 0.2)',
										}}
									/>
									{/* Corner accents - top left */}
									<div
										style={{
											position: 'absolute',
											top: -12,
											left: -12,
											width: 16,
											height: 16,
											borderTop: '2px solid rgba(250, 250, 250, 0.3)',
											borderLeft: '2px solid rgba(250, 250, 250, 0.3)',
											borderTopLeftRadius: 8,
										}}
									/>
									{/* Corner accents - top right */}
									<div
										style={{
											position: 'absolute',
											top: -12,
											right: -12,
											width: 16,
											height: 16,
											borderTop: '2px solid rgba(250, 250, 250, 0.3)',
											borderRight: '2px solid rgba(250, 250, 250, 0.3)',
											borderTopRightRadius: 8,
										}}
									/>
									{/* Corner accents - bottom left */}
									<div
										style={{
											position: 'absolute',
											bottom: -12,
											left: -12,
											width: 16,
											height: 16,
											borderBottom: '2px solid rgba(250, 250, 250, 0.3)',
											borderLeft: '2px solid rgba(250, 250, 250, 0.3)',
											borderBottomLeftRadius: 8,
										}}
									/>
									{/* Corner accents - bottom right */}
									<div
										style={{
											position: 'absolute',
											bottom: -12,
											right: -12,
											width: 16,
											height: 16,
											borderBottom: '2px solid rgba(250, 250, 250, 0.3)',
											borderRight: '2px solid rgba(250, 250, 250, 0.3)',
											borderBottomRightRadius: 8,
										}}
									/>

									{/* Main card content */}
									<div
										style={{
											position: 'relative',
											backgroundColor: colors.neutral[900],
											borderRadius: 12,
											overflow: 'hidden',
											boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
										}}
									>
										{/* Image */}
										<div style={{ aspectRatio: '16/10', overflow: 'hidden' }}>
											<Img
												src={staticFile(project.image)}
												style={{
													width: '100%',
													height: '100%',
													objectFit: 'cover',
												}}
											/>
										</div>

										{/* Info overlay at bottom */}
										<div
											style={{
												padding: '20px 24px',
												background: `linear-gradient(180deg, ${colors.neutral[900]} 0%, ${colors.neutral[950]} 100%)`,
											}}
										>
											{/* Title row */}
											<div
												style={{
													display: 'flex',
													alignItems: 'baseline',
													gap: 12,
												}}
											>
												<h3
													style={{
														fontFamily,
														fontSize: 24,
														fontWeight: 600,
														color: colors.neutral[50],
														margin: 0,
														fontVariationSettings: "'MONO' 1, 'CASL' 1",
													}}
												>
													{project.title}
												</h3>
												<span
													style={{
														fontFamily,
														fontSize: 14,
														color: colors.neutral[400],
														fontVariationSettings: "'MONO' 1, 'CASL' 1",
													}}
												>
													{project.subtitle}
												</span>
											</div>

											{/* Stack badges */}
											<div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
												{project.stack.map((tech) => (
													<span
														key={tech}
														style={{
															fontFamily,
															fontSize: 11,
															fontWeight: 500,
															color: colors.neutral[300],
															backgroundColor: colors.neutral[800],
															padding: '4px 10px',
															borderRadius: 4,
															fontVariationSettings: "'MONO' 1, 'CASL' 1",
															border: `1px solid ${colors.neutral[700]}`,
														}}
													>
														{tech}
													</span>
												))}
											</div>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			{/* Independent floating quote cards */}
			<FloatingQuotes frame={frame} />

			{/* "Selected Work" title - fixed position, fades out */}
			<div
				style={{
					position: 'absolute',
					top: 80,
					left: 96,
					opacity: titleOpacity,
					transform: `translateY(${interpolate(titleOpacity, [0, 1], [20, 0])}px)`,
				}}
			>
				<h2
					style={{
						fontFamily,
						fontSize: 56,
						fontWeight: 500,
						color: colors.neutral[50],
						fontVariationSettings: "'MONO' 1, 'CASL' 1",
						margin: 0,
					}}
				>
					Selected Work
				</h2>
			</div>

			{/* Code snippet that flashes by */}
			<CodeFlash frame={frame} />
		</AbsoluteFill>
	);
}

// ============================================
// FLOATING QUOTES - Independent quote cards
// ============================================

function FloatingQuotes({ frame }: { frame: number }) {
	// Each quote has its own timing and position
	const quoteConfigs = [
		{
			quote: projects[0].quote,
			project: projects[0].title,
			startFrame: 20,
			endFrame: 80,
			x: 1400,
			y: 150,
			floatSpeed: 0.025,
			floatAmplitude: 12,
		},
		{
			quote: projects[1].quote,
			project: projects[1].title,
			startFrame: 70,
			endFrame: 130,
			x: 100,
			y: 700,
			floatSpeed: 0.03,
			floatAmplitude: 10,
		},
		{
			quote: projects[2].quote,
			project: projects[2].title,
			startFrame: 120,
			endFrame: 180,
			x: 1350,
			y: 650,
			floatSpeed: 0.022,
			floatAmplitude: 15,
		},
		{
			quote: projects[3].quote,
			project: projects[3].title,
			startFrame: 170,
			endFrame: 230,
			x: 120,
			y: 180,
			floatSpeed: 0.028,
			floatAmplitude: 8,
		},
	];

	return (
		<>
			{quoteConfigs.map((config, i) => {
				// Fade in and out based on timing
				const opacity = interpolate(
					frame,
					[
						config.startFrame,
						config.startFrame + 15,
						config.endFrame - 15,
						config.endFrame,
					],
					[0, 1, 1, 0],
					{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
				);

				// Scale animation
				const scale = interpolate(
					frame,
					[config.startFrame, config.startFrame + 20],
					[0.9, 1],
					{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
				);

				// Independent floating motion
				const floatY = interpolate(
					Math.sin(frame * config.floatSpeed + i * 2),
					[-1, 1],
					[-config.floatAmplitude, config.floatAmplitude],
				);
				const floatX = interpolate(
					Math.cos(frame * config.floatSpeed * 0.7 + i),
					[-1, 1],
					[-6, 6],
				);

				if (opacity <= 0) return null;

				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: config.x + floatX,
							top: config.y + floatY,
							width: 420,
							opacity,
							transform: `scale(${scale})`,
						}}
					>
						{/* Quote card with background */}
						<div
							style={{
								position: 'relative',
								backgroundColor: colors.neutral[900],
								borderRadius: 12,
								padding: '24px 28px',
								boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
								border: `1px solid ${colors.neutral[700]}`,
							}}
						>
							{/* Accent corner */}
							<div
								style={{
									position: 'absolute',
									top: -6,
									left: -6,
									width: 12,
									height: 12,
									borderTop: `2px solid ${colors.neutral[50]}`,
									borderLeft: `2px solid ${colors.neutral[50]}`,
									borderTopLeftRadius: 4,
									opacity: 0.5,
								}}
							/>
							<div
								style={{
									position: 'absolute',
									bottom: -6,
									right: -6,
									width: 12,
									height: 12,
									borderBottom: `2px solid ${colors.neutral[50]}`,
									borderRight: `2px solid ${colors.neutral[50]}`,
									borderBottomRightRadius: 4,
									opacity: 0.5,
								}}
							/>

							{/* Quote icon */}
							<div
								style={{
									fontFamily,
									fontSize: 48,
									fontWeight: 700,
									color: colors.neutral[700],
									lineHeight: 0.8,
									marginBottom: 8,
									fontVariationSettings: "'MONO' 1, 'CASL' 1",
								}}
							>
								&ldquo;
							</div>

							{/* Quote text */}
							<p
								style={{
									fontFamily,
									fontSize: 22,
									fontStyle: 'italic',
									color: colors.neutral[100],
									lineHeight: 1.5,
									margin: 0,
									marginBottom: 16,
									fontVariationSettings: "'MONO' 1, 'CASL' 1",
								}}
							>
								{config.quote}
							</p>

							{/* Project attribution */}
							<div
								style={{
									fontFamily,
									fontSize: 12,
									fontWeight: 500,
									color: colors.neutral[400],
									textTransform: 'uppercase',
									letterSpacing: '0.05em',
									fontVariationSettings: "'MONO' 1, 'CASL' 1",
								}}
							>
								— {config.project}
							</div>
						</div>
					</div>
				);
			})}
		</>
	);
}

// ============================================
// SPEED LINES - Motion blur effect
// ============================================

function SpeedLines({ frame }: { frame: number }) {
	const lines = Array.from({ length: 20 }, (_, i) => ({
		x: (i * 107) % 1920,
		y: (i * 73) % 1080,
		length: 80 + (i % 5) * 40,
		speed: 0.3 + (i % 3) * 0.2,
	}));

	return (
		<>
			{lines.map((line, i) => {
				const offset = (frame * line.speed * 10) % 2200;
				const opacity = interpolate(
					frame,
					[0, 30, 200, 240],
					[0, 0.12, 0.12, 0],
					{ extrapolateRight: 'clamp' },
				);

				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: line.x,
							top: line.y,
							width: line.length,
							height: 1,
							background: `linear-gradient(90deg, transparent, ${colors.neutral[50]}40, transparent)`,
							transform: `translateX(${-offset}px)`,
							opacity,
						}}
					/>
				);
			})}
		</>
	);
}

// ============================================
// CODE FLASH - Brief code snippet appearance
// ============================================

function CodeFlash({ frame }: { frame: number }) {
	// Show code snippet in the middle of the scene - longer visible
	const codeOpacity = interpolate(
		frame,
		[100, 120, 160, 180],
		[0, 0.7, 0.7, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
	);

	const codeSnippet = `const result = streamText({
  model: anthropic('claude-sonnet-4'),
  messages,
  maxTokens: 4096,
});`;

	return (
		<div
			style={{
				position: 'absolute',
				bottom: 60,
				right: 60,
				opacity: codeOpacity,
				transform: `translateY(${interpolate(codeOpacity, [0, 0.6], [20, 0])}px)`,
			}}
		>
			<div
				style={{
					backgroundColor: 'rgba(23, 23, 23, 0.9)',
					border: `1px solid ${colors.neutral[700]}`,
					borderRadius: 8,
					padding: 16,
					maxWidth: 400,
				}}
			>
				<div
					style={{
						fontFamily,
						fontSize: 11,
						color: colors.neutral[500],
						marginBottom: 8,
						fontVariationSettings: "'MONO' 1, 'CASL' 1",
					}}
				>
					api/chat/route.ts
				</div>
				<pre
					style={{
						fontFamily,
						fontSize: 12,
						color: colors.neutral[300],
						margin: 0,
						lineHeight: 1.5,
						fontVariationSettings: "'MONO' 1",
					}}
				>
					{codeSnippet}
				</pre>
			</div>
		</div>
	);
}
// ============================================
// SERVICES SCENE - FANCIER CARD ANIMATIONS
// ============================================

function ServicesScene() {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const titleProgress = spring({
		frame,
		fps,
		config: { damping: 200 },
	});

	// Faster card cycling with more dramatic animations
	const cardCycleDuration = 40; // frames per card
	const activeIndex = Math.min(3, Math.floor(frame / cardCycleDuration));

	return (
		<AbsoluteFill style={{ backgroundColor: colors.neutral[950] }}>
			<BackgroundGrid dark />

			<div
				style={{
					display: 'flex',
					height: '100%',
					padding: 96,
					gap: 80,
				}}
			>
				{/* Left - title */}
				<div
					style={{
						flex: 1,
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<h2
						style={{
							fontFamily,
							fontSize: 64,
							fontWeight: 500,
							color: colors.neutral[50],
							fontVariationSettings: "'MONO' 1, 'CASL' 1",
							opacity: titleProgress,
							transform: `translateX(${interpolate(titleProgress, [0, 1], [-50, 0])}px)`,
						}}
					>
						What I do
					</h2>
				</div>

				{/* Right - card stack with fancy animations */}
				<div
					style={{
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
						perspective: 1200,
					}}
				>
					{services.map((service, i) => {
						const stackPos =
							(i - activeIndex + services.length) % services.length;
						const isExiting = i < activeIndex;
						const isActive = i === activeIndex;

						// Entry animation - spring with bounce
						const entryProgress = spring({
							frame: frame - i * 8,
							fps,
							config: { damping: 12, stiffness: 120 },
						});

						// Continuous subtle floating for active card
						const floatY = isActive
							? interpolate(Math.sin(frame * 0.08), [-1, 1], [-8, 8])
							: 0;
						const floatRotate = isActive
							? interpolate(Math.sin(frame * 0.05), [-1, 1], [-1, 1])
							: 0;

						// Exit animation - dramatic swipe out with 3D rotation
						let exitProgress = 0;
						if (isExiting) {
							const exitStartFrame = (i + 1) * cardCycleDuration - 15;
							exitProgress = interpolate(
								frame - exitStartFrame,
								[0, 15],
								[0, 1],
								{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
							);
						}

						// Stack positions with more dramatic offset
						const positions = [
							{ x: 0, y: 0, rotateY: 0, rotateZ: 0, scale: 1, opacity: 1 },
							{
								x: 25,
								y: 20,
								rotateY: -5,
								rotateZ: 3,
								scale: 0.95,
								opacity: 0.7,
							},
							{
								x: 50,
								y: 40,
								rotateY: -10,
								rotateZ: 6,
								scale: 0.9,
								opacity: 0.4,
							},
							{
								x: 75,
								y: 60,
								rotateY: -15,
								rotateZ: 9,
								scale: 0.85,
								opacity: 0,
							},
						];

						// Exit animation values - dramatic 3D flip out
						const exitX = interpolate(exitProgress, [0, 1], [0, -600]);
						const exitY = interpolate(exitProgress, [0, 1], [0, -150]);
						const exitRotateY = interpolate(exitProgress, [0, 1], [0, 45]);
						const exitRotateZ = interpolate(exitProgress, [0, 1], [0, -25]);
						const exitScale = interpolate(exitProgress, [0, 1], [1, 0.7]);
						const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

						const pos = isExiting
							? {
									x: exitX,
									y: exitY,
									rotateY: exitRotateY,
									rotateZ: exitRotateZ,
									scale: exitScale,
									opacity: exitOpacity,
								}
							: positions[Math.min(stackPos, 3)];

						// Add floating to active card position
						const finalY = pos.y + floatY;
						const finalRotateZ = (pos.rotateZ || 0) + floatRotate;

						return (
							<div
								key={service.title}
								style={{
									position: 'absolute',
									width: 500,
									transformStyle: 'preserve-3d',
									transform: `
										translateX(${pos.x}px)
										translateY(${finalY}px)
										rotateY(${pos.rotateY || 0}deg)
										rotateZ(${finalRotateZ}deg)
										scale(${pos.scale * entryProgress})
									`,
									opacity: pos.opacity * entryProgress,
									zIndex: 10 - stackPos,
								}}
							>
								{/* Card with CardFrame styling */}
								<div style={{ position: 'relative' }}>
									{/* Outer border */}
									<div
										style={{
											position: 'absolute',
											inset: -12,
											borderRadius: 16,
											border: `2px solid rgba(250, 250, 250, 0.1)`,
										}}
									/>
									{/* Inner border */}
									<div
										style={{
											position: 'absolute',
											inset: -6,
											borderRadius: 12,
											border: `1px solid rgba(250, 250, 250, 0.2)`,
										}}
									/>
									{/* Corner accents */}
									<div
										style={{
											position: 'absolute',
											top: -12,
											left: -12,
											width: 16,
											height: 16,
											borderTop: `2px solid rgba(250, 250, 250, 0.3)`,
											borderLeft: `2px solid rgba(250, 250, 250, 0.3)`,
											borderTopLeftRadius: 8,
										}}
									/>
									<div
										style={{
											position: 'absolute',
											top: -12,
											right: -12,
											width: 16,
											height: 16,
											borderTop: `2px solid rgba(250, 250, 250, 0.3)`,
											borderRight: `2px solid rgba(250, 250, 250, 0.3)`,
											borderTopRightRadius: 8,
										}}
									/>
									<div
										style={{
											position: 'absolute',
											bottom: -12,
											left: -12,
											width: 16,
											height: 16,
											borderBottom: `2px solid rgba(250, 250, 250, 0.3)`,
											borderLeft: `2px solid rgba(250, 250, 250, 0.3)`,
											borderBottomLeftRadius: 8,
										}}
									/>
									<div
										style={{
											position: 'absolute',
											bottom: -12,
											right: -12,
											width: 16,
											height: 16,
											borderBottom: `2px solid rgba(250, 250, 250, 0.3)`,
											borderRight: `2px solid rgba(250, 250, 250, 0.3)`,
											borderBottomRightRadius: 8,
										}}
									/>

									{/* Card content */}
									<div
										style={{
											padding: 40,
											backgroundColor: colors.neutral[900],
											borderRadius: 8,
											minHeight: 380,
											display: 'flex',
											flexDirection: 'column',
										}}
									>
										{/* Number */}
										<span
											style={{
												fontFamily,
												fontSize: 72,
												fontWeight: 700,
												color: colors.neutral[700],
												fontVariationSettings: "'MONO' 1, 'CASL' 1",
											}}
										>
											{String(i + 1).padStart(2, '0')}
										</span>

										{/* Title */}
										<h3
											style={{
												fontFamily,
												fontSize: 28,
												fontWeight: 500,
												color: colors.neutral[50],
												marginTop: 12,
												marginBottom: 12,
												fontVariationSettings: "'MONO' 1, 'CASL' 1",
											}}
										>
											{service.title}
										</h3>

										{/* Keywords */}
										<div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
											{service.keywords.map((kw) => (
												<span
													key={kw}
													style={{
														fontFamily,
														fontSize: 12,
														fontWeight: 500,
														color: colors.neutral[400],
														backgroundColor: colors.neutral[800],
														padding: '4px 12px',
														borderRadius: 999,
														fontVariationSettings: "'MONO' 1, 'CASL' 1",
													}}
												>
													{kw}
												</span>
											))}
										</div>

										{/* Description */}
										<p
											style={{
												fontFamily,
												fontSize: 16,
												color: colors.neutral[400],
												lineHeight: 1.6,
												flex: 1,
												fontVariationSettings: "'MONO' 1, 'CASL' 1",
											}}
										>
											{service.description}
										</p>

										{/* Quote */}
										<blockquote
											style={{
												fontFamily,
												fontSize: 16,
												fontWeight: 500,
												fontStyle: 'italic',
												color: colors.neutral[50],
												borderLeft: `4px solid ${colors.neutral[50]}`,
												paddingLeft: 16,
												marginTop: 16,
												fontVariationSettings: "'MONO' 1, 'CASL' 1",
											}}
										>
											&ldquo;{service.quote}&rdquo;
										</blockquote>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</AbsoluteFill>
	);
}

// ============================================
// CONTACT SCENE - DRAMATICALLY COOLER
// ============================================

function ContactScene() {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Cinematic zoom effect - camera pulling back
	const zoomProgress = spring({
		frame,
		fps,
		config: { damping: 30, stiffness: 50 },
	});
	const cameraZoom = interpolate(zoomProgress, [0, 1], [1.3, 1]);

	// Logo animation - dramatic 3D spin entrance
	const logoProgress = spring({
		frame,
		fps,
		config: { damping: 12, stiffness: 80 },
	});
	const logoScale = interpolate(logoProgress, [0, 1], [0, 1]);
	const logoRotateY = interpolate(logoProgress, [0, 1], [180, 0]);
	const logoRotateZ = interpolate(logoProgress, [0, 1], [-30, 0]);

	// Continuous logo animation
	const logoFloat = interpolate(Math.sin(frame * 0.06), [-1, 1], [-5, 5]);
	const logoGlow = interpolate(Math.sin(frame * 0.08), [-1, 1], [30, 60]);

	// Text reveals - staggered with 3D effect
	const textProgress = spring({
		frame: frame - 25,
		fps,
		config: { damping: 20, stiffness: 100 },
	});

	const urlProgress = spring({
		frame: frame - 45,
		fps,
		config: { damping: 20, stiffness: 100 },
	});

	// Animated ring around logo
	const ringProgress = spring({
		frame: frame - 10,
		fps,
		config: { damping: 25, stiffness: 60 },
	});
	const ringScale = interpolate(ringProgress, [0, 1], [0.5, 1]);
	const ringOpacity = interpolate(ringProgress, [0, 1], [0, 0.3]);
	const ringRotation = frame * 0.5;

	// Converging lines from edges
	const lineProgress = spring({
		frame,
		fps,
		config: { damping: 40, stiffness: 80 },
	});

	// Radial gradient pulse
	const pulseSize = interpolate(Math.sin(frame * 0.05), [-1, 1], [400, 500]);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: colors.neutral[950],
				transform: `scale(${cameraZoom})`,
				perspective: 1200,
			}}
		>
			<BackgroundGrid dark />
			<FloatingParticles frame={frame} />

			{/* Radial gradient glow behind logo */}
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					width: pulseSize,
					height: pulseSize,
					borderRadius: '50%',
					background: `radial-gradient(circle, rgba(250, 250, 250, 0.08) 0%, transparent 70%)`,
					transform: 'translate(-50%, -50%)',
				}}
			/>

			{/* Animated ring around logo */}
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					width: 300,
					height: 300,
					border: `1px solid rgba(250, 250, 250, ${ringOpacity})`,
					borderRadius: '50%',
					transform: `translate(-50%, -50%) scale(${ringScale}) rotate(${ringRotation}deg)`,
				}}
			/>
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					width: 400,
					height: 400,
					border: `1px solid rgba(250, 250, 250, ${ringOpacity * 0.5})`,
					borderRadius: '50%',
					transform: `translate(-50%, -50%) scale(${ringScale}) rotate(${-ringRotation * 0.7}deg)`,
				}}
			/>

			{/* Converging lines */}
			<svg
				style={{
					position: 'absolute',
					inset: 0,
					width: '100%',
					height: '100%',
				}}
			>
				{[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
					const rad = (angle * Math.PI) / 180;
					const startDist = 1200;
					const endDist = interpolate(lineProgress, [0, 1], [1200, 250]);

					const x1 = 960 + Math.cos(rad) * startDist;
					const y1 = 540 + Math.sin(rad) * startDist;
					const x2 = 960 + Math.cos(rad) * endDist;
					const y2 = 540 + Math.sin(rad) * endDist;

					return (
						<line
							key={i}
							x1={x1}
							y1={y1}
							x2={x2}
							y2={y2}
							stroke={`rgba(250, 250, 250, ${0.1 * lineProgress})`}
							strokeWidth={1}
						/>
					);
				})}
			</svg>

			{/* Main content */}
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100%',
					transformStyle: 'preserve-3d',
				}}
			>
				{/* Large BW logo with 3D spin */}
				<div
					style={{
						fontFamily,
						fontSize: 180,
						fontWeight: 700,
						color: colors.neutral[50],
						letterSpacing: '-0.025em',
						fontVariationSettings: "'MONO' 1, 'CASL' 1",
						marginBottom: 40,
						transform: `
							scale(${logoScale})
							rotateY(${logoRotateY}deg)
							rotateZ(${logoRotateZ}deg)
							translateY(${logoFloat}px)
						`,
						textShadow: `0 0 ${logoGlow}px rgba(250, 250, 250, 0.5)`,
						transformStyle: 'preserve-3d',
					}}
				>
					BW
				</div>

				{/* "Let's chat" with dramatic reveal */}
				<h2
					style={{
						fontFamily,
						fontSize: 72,
						fontWeight: 500,
						color: colors.neutral[50],
						textAlign: 'center',
						marginBottom: 32,
						lineHeight: 1.2,
						fontVariationSettings: "'MONO' 1, 'CASL' 1",
						opacity: textProgress,
						transform: `
							translateY(${interpolate(textProgress, [0, 1], [40, 0])}px)
							rotateX(${interpolate(textProgress, [0, 1], [-20, 0])}deg)
						`,
						transformStyle: 'preserve-3d',
					}}
				>
					Let's chat.
				</h2>

				{/* Website URL with animated underline */}
				<div
					style={{
						position: 'relative',
						display: 'inline-block',
						opacity: urlProgress,
						transform: `
							translateY(${interpolate(urlProgress, [0, 1], [30, 0])}px)
							scale(${interpolate(urlProgress, [0, 1], [0.9, 1])})
						`,
					}}
				>
					<p
						style={{
							fontFamily,
							fontSize: 36,
							fontWeight: 500,
							color: colors.neutral[300],
							fontVariationSettings: "'MONO' 1, 'CASL' 1",
						}}
					>
						waardenburg.dev
					</p>
					{/* Animated underline from center */}
					<div
						style={{
							position: 'absolute',
							bottom: -4,
							left: '50%',
							width: `${interpolate(urlProgress, [0, 1], [0, 100])}%`,
							height: 2,
							backgroundColor: colors.neutral[50],
							transform: 'translateX(-50%)',
						}}
					/>
				</div>
			</div>

			{/* Four corner brackets that animate in */}
			<CornerBrackets frame={frame} fps={fps} />
		</AbsoluteFill>
	);
}

// ============================================
// CORNER BRACKETS FOR CONTACT
// ============================================

function CornerBrackets({ frame, fps }: { frame: number; fps: number }) {
	const progress = spring({
		frame: frame - 15,
		fps,
		config: { damping: 25, stiffness: 70 },
	});

	const size = 60;
	const offset = 80;
	const lineLength = interpolate(progress, [0, 1], [0, size]);
	const opacity = interpolate(progress, [0, 1], [0, 0.4]);

	const corners = [
		{ top: offset, left: offset, rotateZ: 0 },
		{ top: offset, right: offset, rotateZ: 90 },
		{ bottom: offset, right: offset, rotateZ: 180 },
		{ bottom: offset, left: offset, rotateZ: 270 },
	];

	return (
		<>
			{corners.map((corner, i) => (
				<div
					key={i}
					style={{
						position: 'absolute',
						...corner,
						width: size,
						height: size,
						transform: `rotate(${corner.rotateZ}deg)`,
					}}
				>
					<div
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							width: lineLength,
							height: 2,
							backgroundColor: colors.neutral[50],
							opacity,
						}}
					/>
					<div
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							width: 2,
							height: lineLength,
							backgroundColor: colors.neutral[50],
							opacity,
						}}
					/>
				</div>
			))}
		</>
	);
}

// ============================================
// MAIN COMPOSITION
// ============================================

export function PromoVideo() {
	return (
		<TransitionSeries>
			{/* Hero intro */}
			<TransitionSeries.Sequence durationInFrames={100}>
				<HeroScene />
			</TransitionSeries.Sequence>

			<TransitionSeries.Transition
				presentation={fade()}
				timing={linearTiming({ durationInFrames: 15 })}
			/>

			{/* Marquee 1 - Work */}
			<TransitionSeries.Sequence durationInFrames={70}>
				<MarqueeScene text={marquees.work} />
			</TransitionSeries.Sequence>

			<TransitionSeries.Transition
				presentation={slide({ direction: 'from-right' })}
				timing={linearTiming({ durationInFrames: 20 })}
			/>

			{/* Projects */}
			<TransitionSeries.Sequence durationInFrames={240}>
				<ProjectsScene />
			</TransitionSeries.Sequence>

			<TransitionSeries.Transition
				presentation={fade()}
				timing={linearTiming({ durationInFrames: 15 })}
			/>

			{/* Marquee 2 - About (inverted colors) */}
			<TransitionSeries.Sequence durationInFrames={70}>
				<MarqueeScene text={marquees.about} invert />
			</TransitionSeries.Sequence>

			<TransitionSeries.Transition
				presentation={slide({ direction: 'from-left' })}
				timing={linearTiming({ durationInFrames: 20 })}
			/>

			{/* Services */}
			<TransitionSeries.Sequence durationInFrames={180}>
				<ServicesScene />
			</TransitionSeries.Sequence>

			<TransitionSeries.Transition
				presentation={fade()}
				timing={linearTiming({ durationInFrames: 15 })}
			/>

			{/* Marquee 3 - Contact */}
			<TransitionSeries.Sequence durationInFrames={70}>
				<MarqueeScene text={marquees.contact} />
			</TransitionSeries.Sequence>

			<TransitionSeries.Transition
				presentation={fade()}
				timing={linearTiming({ durationInFrames: 20 })}
			/>

			{/* Contact CTA */}
			<TransitionSeries.Sequence durationInFrames={100}>
				<ContactScene />
			</TransitionSeries.Sequence>
		</TransitionSeries>
	);
}
