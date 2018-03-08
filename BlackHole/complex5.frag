
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.2831853072

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

mat2 scale(vec2 _scale);
vec3 hsb2rgb_sm( in vec3 c );
mat2 rotate2d(float _angle);

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  st.x *= u_resolution.x/u_resolution.y;
  vec3 color = vec3(0.);

  st -= vec2(0.5);

  /////
  // play with this
  float rot1 = sin(60.+u_time+length(st*(60.+u_time)*.2));
  float rot2 = u_time*.02;
  st *= rotate2d(mix(rot1, rot2, u_time*0.0025*pow(length(st), 2.)));
  /////
  st *= rotate2d(-u_time*0.15);

  st += vec2(0.5);
  st *= scale(vec2(-60.-u_time*.015));

  st -= vec2(0.5);

  float a = .7;
  float b = .5;
  float c = .6;
  float t = atan(st.x/st.y);

  float x = (a+b)*cos(t+2.*u_time) - c*cos((a/b + t+.015*u_time)*t);
  float y = (a+b)*sin(t-2.*u_time) - c*sin((a/b + 1.-.025*u_time)*t);

  vec2 epi = vec2(x,y);

  // st.x += .5*sin(4.*PI*st.y);
  st += epi;

  //color = vec3(sin(length(st)));
  float factor = sin(length(st));
  color = hsb2rgb_sm(vec3(.65, .2, .25+factor)); 

  gl_FragColor = vec4(color, 1.0);
}

mat2 scale(vec2 _scale) {
  return mat2(_scale.x, 0.0,
              0.0, _scale.y);
}

vec3 hsb2rgb_sm( in vec3 c )
{
  vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );

	rgb = rgb*rgb*(3.0-2.0*rgb); // cubic smoothing	

	return c.z * mix( vec3(1.0), rgb, c.y);
}

mat2 rotate2d(float _angle){
  return mat2(cos(_angle),-sin(_angle),
              sin(_angle),cos(_angle));
}

