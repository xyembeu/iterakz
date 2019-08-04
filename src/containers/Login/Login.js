import React, {Component} from 'react'
import Auth from '../../components/Auth/Auth'

export default class Login extends Component {

    render() {
        return (
            <div className={'auth-page gray-bg'}>
                <div className={'middle-box loginscreen animated fadeInDown'}>
                    <div className="text-center">
                        <h3>Панель управления мобильным приложением</h3>
                        <p>Чтобы воспользоваться панелью администратора, пожалуйста, авторизуйтесь</p>
                    </div>
                    <Auth/>
                    <p className="m-t">
                        <small>Текст...</small>
                    </p>
                </div>
            </div>
        )
    }
}
