export function TextFiled({label, type, ...props}){ //...props : 여러개의 input



  return(
    <div className="form-group">
      <label>{label}</label><br/>
        <input className="form-control" required type={type} {...props}/>
    </div>
  )
}