import SpinnerImg from './assets/spinner.gif'

export default function Spinner() {
  return <div className='text-center mx-auto'>
      <img width={180} src={SpinnerImg} alt="Loading..." />
  </div>;
}
