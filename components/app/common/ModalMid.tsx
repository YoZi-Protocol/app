import '@google/model-viewer';

const ModelLarge = () => (
  <div id='card'>
    <model-viewer
      autoplay
      touch-action='pan-y'
      style={{
        width: '338px',
        height: '340px',
        background: '#3b423d30',
        boxShadow: '2px 4px 8px rgba(200, 200, 200, 0.5)',
      }}
      src='/pomelo.glb'
      skybox-image=''
      alt='A 3D model of an astronaut'
      ar
      xr-environment
      auto-rotate
      camera-controls
      shadow-intensity='1'>
      <effect-composer>
        <bloom-effect />
        <color-grade-effect />
        <color-grade-effect
          contrast='0.8'
          saturation='-6'
          opacity='1'
          blend-mode='Skip'
        />
      </effect-composer>
    </model-viewer>
  </div>
);

export default ModelLarge;
