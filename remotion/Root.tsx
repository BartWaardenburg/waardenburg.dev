import { Composition } from 'remotion';
import { PromoVideo } from './PromoVideo';

export const RemotionRoot = () => {
	return (
		<Composition
			id="PromoVideo"
			component={PromoVideo}
			durationInFrames={725}
			fps={30}
			width={1920}
			height={1080}
		/>
	);
};
