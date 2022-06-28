import './App.css';
import React, { useEffect } from 'react';
import { useState } from 'react';

const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(true)
  const [minLenghtError, setMinLenghtError] = useState(false)
  const [maxLenghtError, setMaxLenghtError] = useState(false)
  const [emailError, setEmailError] = useState(false)

  useEffect(() => {
    for (const validation in validations){
      switch(validation){
        case 'minLenght':
          value.lenght < 3 ? setMinLenghtError(true) : setMinLenghtError(false)
          //value.lenght < 3 || value.lenght > 8 ? setMinLenghtError(true) : setMinLenghtError(false)

          
          break;
        case 'isEmpty':
          value ? setEmpty(false) : setEmpty(true)
          break;
        case 'maxLenght':
          value.lenght > validations[validation] ? setMaxLenghtError(true) : setMaxLenghtError(false)
          //value.lenght < 3 || value.lenght > 8 ? setMaxLenghtError(true) : setMaxLenghtError(false)
          break
        case 'isEmail':
          const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          return re.test(String(value).toLocaleLowerCase()) ? setEmailError(false) : setEmailError(true)
          break
      }  
    }
  },[value])
  return{
    isEmpty,
    minLenghtError,
    maxLenghtError,
    emailError
    
  }
}


const useInput  = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue)
  const [isDirty, setDirty] = useState(false)
   
  const valid = useValidation(value, validations)

  const onChange = (e) =>{
    setValue(e.target.value)
  }
  const onBlur = (e) =>{
    setDirty(true)
  }
  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid
  }
}

const App = () => {

  const lastName = useInput('',  {isEmpty: true, minLenght:3})
  const email = useInput('', {isEmpty: true, minLenght: 5, isEmail: true})
  const message = useInput('', {isEmpty: true, minLenght: 10})



const [items, setItems] = React.useState([])

React.useEffect(() => {
  
  fetch(`https://628ce7a43df57e983ed86e96.mockapi.io/form`,)
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr)
        console.log(arr)
      })
 }, [])
 const pizzas = items.map((obj) => ((obj)))


  return (
    
    <div className="container">
      <div className="content">

        <div className="left-side">
          <div className="address details">
            <i className="fas fa-map-marker-alt"></i>

             <img width={250} src="https://seobility.by/upload/CDigital/259/2590793372266ce03ac3fd6eda6aa0d1.svg"/>


            <div className="topic">Адрес</div>
            <div className="text-one"> г. Минск</div>
            <div className="text-two"> ул. Лазо 16, 3 этаж, офис 44</div>
          </div>
          <div className="phone details">
            <i className="fas fa-phone-alt"></i>
            <div className="topic">Телефон</div>
            <div className="text-one">+375293321616</div>
            <div className="text-two">+375445505550</div>
          </div>
          <div className="email details">
            <i className="fas fa-envelope"></i>
            <div className="topic">Email</div>
            <div className="text-one">info@seobility.by</div>
          </div>
        </div>
        <div className="right-side">
          <div className="topic-text">Отправьте нам сообщение</div>
          <p>
            Если у вас есть какие-то вопросы или предложения по сотрудничеству -
            заполните форму ниже
          </p>
          
          <form action="#" >
            <div className="input-box">
             
              
              <input onChange={e => lastName.onChange(e)} onBlur={e => lastName.onBlur(e)} value={lastName.value}
                name='lastName' type="text" pattern="[A-Z}"  placeholder="Ваше имя и фамилия" />
              {(lastName.isDirty && lastName.isEmpty) && <div style={{color:'red'}}>Поле не может быть пустым!</div> }
              {(lastName.isDirty && lastName.minLenghtError) && <div style={{color:'red'}}>Маленькая длина!Больше трех символов!</div> }

                
            </div>
            
            <div className="input-box">
            
              <input onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)} value={email.value} 
               name='email' type="text" placeholder="Введите email" />
              {(email.isDirty && email.isEmpty) && <div style={{ color:'red'}}>Поле не может быть пустым!</div> }
              {(email.isDirty && email.emailError) && <div style={{color:'red'}}>Некоректный email!</div> }
            </div>


            <div className="input-box">
            
              <input type="text" placeholder="Введите телефон +7(___)___-__-__" maxlength="12"/>
              
            </div>
            <div className="input-box">
              <input type="date" placeholder="Введите дату рождения" />
            </div>

            <div className="input-box message-box">
              <textarea onChange={e => message.onChange(e)} onBlur={e => message.onBlur(e)} value={message.value} 
              name='message' placeholder="Сообщение" ></textarea>
              {(message.isDirty && message.isEmpty) && <div style={{color:'red'}} >Поле не может быть пустым!</div> }
              {(message.isDirty && message.minLenghtError) && <div style={{color:'red'}} >Маленькая длина!Больше десяти символов!</div> }
            </div>

            <div className="button">
              <input type="submit" value="Отправить" ></input>
            </div>
          </form>
        </div>
      </div>
    </div>

   
  );
}

export default App;

//  const onSubmit = async () => {
//   const formData = new FormData()
//   if (data.files) {
//     value.forEach((file) => {
//       formData.append("files", file, file.name);
//     });
//   }

//   value.forEach((entry) => {
//     formData.append(entry[0], entry[1]);
//   });

//   const res = await fetch("http://localhost:4000/", {
//     method: "POST",
//     body: formData,
//   });

//   if (res.status === 200) {
//     Swal.fire("Great job!", "You've passed the challenge!", "success");
   
//   }
//  }