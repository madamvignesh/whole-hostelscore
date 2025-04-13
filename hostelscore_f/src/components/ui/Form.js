export function Form({ children }) {
    return <div>{children}</div>
  }
  
  export function FormField({ render }) {
    return render({ field: {} })
  }
  
  export function FormItem({ children }) {
    return <div className="form-item">{children}</div>
  }
  
  export function FormLabel({ children }) {
    return <label className="form-label">{children}</label>
  }
  
  export function FormControl({ children }) {
    return <div className="form-control">{children}</div>
  }
  
  export function FormMessage({ children }) {
    return <small className="form-message">{children}</small>
  }
  