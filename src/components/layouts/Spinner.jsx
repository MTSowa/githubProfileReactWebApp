import SpinnerImg from './assets/spinner.gif'

export default function Spinner() {
  return <div className='text-center mx-auto'>
      <img className='text-center mx-auto' width={50} src={SpinnerImg} alt="Loading..." />
  </div>;
}
