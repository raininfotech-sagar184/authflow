export default function Loader(props) {
  return (
    <svg className={`circular ${props?.cls || ""}`} viewBox="25 25 50 50">
      <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="5" strokeMiterlimit="10" />
    </svg>
  )
}
export const ButtonSpinner = ( ) => {
  return (
    <div className={`spinner-border spinner-border-sm `} role="status">
      <span className="sr-only">Loading...</span>
    </div>

  )
}