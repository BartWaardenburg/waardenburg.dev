// Minimal column-major mat4 helpers, just enough for one perspective camera.

export type Mat4 = Float32Array;

export const perspective = (
	out: Mat4,
	fovY: number,
	aspect: number,
	near: number,
	far: number,
): Mat4 => {
	const f = 1 / Math.tan(fovY / 2);
	const nf = 1 / (near - far);
	out.fill(0);
	out[0] = f / aspect;
	out[5] = f;
	out[10] = (far + near) * nf;
	out[11] = -1;
	out[14] = 2 * far * near * nf;
	return out;
};

export const lookAt = (
	out: Mat4,
	eye: [number, number, number],
	target: [number, number, number],
): Mat4 => {
	let zx = eye[0] - target[0];
	let zy = eye[1] - target[1];
	let zz = eye[2] - target[2];
	let len = Math.hypot(zx, zy, zz) || 1;
	zx /= len;
	zy /= len;
	zz /= len;
	// up = (0, 1, 0)
	let xx = zz;
	let xy = 0;
	let xz = -zx;
	len = Math.hypot(xx, xy, xz) || 1;
	xx /= len;
	xy /= len;
	xz /= len;
	const yx = zy * xz - zz * xy;
	const yy = zz * xx - zx * xz;
	const yz = zx * xy - zy * xx;
	out[0] = xx;
	out[1] = yx;
	out[2] = zx;
	out[3] = 0;
	out[4] = xy;
	out[5] = yy;
	out[6] = zy;
	out[7] = 0;
	out[8] = xz;
	out[9] = yz;
	out[10] = zz;
	out[11] = 0;
	out[12] = -(xx * eye[0] + xy * eye[1] + xz * eye[2]);
	out[13] = -(yx * eye[0] + yy * eye[1] + yz * eye[2]);
	out[14] = -(zx * eye[0] + zy * eye[1] + zz * eye[2]);
	out[15] = 1;
	return out;
};
