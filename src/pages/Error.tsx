import Error from '../photos/error.gif'

function error() {
  return (
    <div style={{
        width:'100%',
        height: '100vh',
        background: `url(${Error})`,
backgroundBlendMode: 'multiply',
backgroundPosition: 'center',
backgroundSize: 'cover',
backgroundRepeat: 'no-repeat',
transition: 'background 0.6s ease',
    backgroundAttachment: 'fixed'
    }}>
<h2 style={{color:'white'}}>Не балуйтесь с адресной строкой!</h2>
</div>
  );
}

export default error;