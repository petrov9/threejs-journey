uniform vec3 uDeptColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;

varying float vElecation;

void main(){
    float mixStrength = vElecation * uColorMultiplier + uColorOffset;
    vec3 color = mix(uDeptColor, uSurfaceColor, mixStrength);
    gl_FragColor = vec4(color, 1.0);
}