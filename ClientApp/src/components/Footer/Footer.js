import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "./Footer.css"
import { getJwt, deleteJwt } from '../Login/helpers';




class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Auth: false
        };
    }
    componentDidMount() {
        const jwtt = getJwt();
        if (jwtt) {
            this.setState({ Auth: true })
        }
    }
    handleLogOff(event) {
        event.preventDefault();
        deleteJwt();
        this.setState({ Auth: false })
        window.location.reload();

    }
    render() {
        const { Auth } = this.state;
        return (
            <div>

                <footer className="footer is-primary">
                    {/* <div className="content has-text-centered is-primary">
            {
                Auth? 
                <div>
                 <Link to="/" onClick={(e)=>this.handleLogOff(e)}><button className="button is-dark">Выйти из аккаунта</button></Link>                
                 </div>
            :<Link to="/Login"><button className="button is-dark">Войти в аккаунт</button></Link>
        }
        </div> */}
                    <div className="columns is-8 is-variable">
                        <div className="column is-1">

                        </div>
                        <div className="column is-5">
                            <p>О нас</p>
                            <br></br>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        </div>
                        <div className="column">
                            <p>Категории</p>
                            <br></br>
                            <Link to="/Комоды">Комоды и шкафы</Link>
                            <br></br>
                            <Link to="/МягкаяЧасть">Мягкая часть</Link>
                            <br></br>
                            <Link to="/СтолыИСтулья">Столы и стулья</Link>
                            <br></br>
                            <Link to="/Часы">Часы</Link>
                            <br></br>
                            <Link to="/Разное">Разное</Link>
                        </div>
                        <div className="column">
                            <p>Быстрые ссылки</p>
                            <br></br>
                            <Link to="/Корзина">Корзина</Link>
                            <br></br>
                            <Link to="/Статус">Статус заказа</Link>
                            <br></br>
                            {Auth?<Link to="/" onClick={(e)=>this.handleLogOff(e)}>Выйти из аккаунта</Link>:<Link to="/login">Войти в аккаунт</Link>}
                            
                        </div>
                    </div>
                </footer>


            </div>
        )
    }

}

export default Footer;