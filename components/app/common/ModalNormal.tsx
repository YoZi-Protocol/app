import '@google/model-viewer';

const Model = () => (
  <div id='card'>
    <model-viewer
      autoplay
      touch-action='pan-y'
      style={{
        width: '156px',
        height: '158px',
      }}
      src='/pomelo.glb'
      skybox-image=''
      alt='A 3D model of an astronaut'
      ar
      xr-environment
      auto-rotate
      camera-controls
      shadow-intensity='1'
    />
  </div>
);

export default Model;
