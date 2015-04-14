// #pragma glslify: fog_exp2 = require(glsl-fog/exp2)
#pragma glslify: fog_exp = require(glsl-fog/exp)

#define FOG_DENSITY 0.007

uniform float time;
varying vec2 vUv;
varying float fogAmount;
varying vec4 vertexColor;

void main() {
  float fogDistance = gl_FragCoord.z / gl_FragCoord.w;
  float fogAmount = fog_exp(fogDistance, FOG_DENSITY);
  vec4 fogColor = vec4(0., 0., 0., 1.);
  vec4 pixelColor = mix(vertexColor, fogColor, fogAmount);

  gl_FragColor = pixelColor;
}