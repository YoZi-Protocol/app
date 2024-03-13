import '@google/model-viewer';

const Model = () => (
  <div id='card'>
    <model-viewer
      style={{
        width: '156px',
        height: '158px',
      }}
      src='/pomelo.glb'
      alt='A 3D model'
      shadow-intensity='0'
      exposure='0.5'
      camera-controls
      auto-rotate
      ar
    />
  </div>
);

export default Model;
