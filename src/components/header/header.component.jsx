import React from 'react';

import {auth} from '../../firebase/firebase.utils';
import {ReactComponent as Logo} from '../../assets/crown.svg'
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from '../../Redux/user/user.selectors';
import {selectCartHidden} from '../../Redux/cart/cart.selectors';
import {signOutStart} from '../../Redux/user/user.action'
import CartIcon from '../cart/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import {HeaderContainer,LogoContainer,OptionsContainer,OptionDiv,OptionLink} from './header.style';

const Header = ({currentUser,hidden,signOutStart})=>(

    <HeaderContainer>
    <LogoContainer to='/'>
        <Logo className='logo'/>
    </LogoContainer>
    <OptionsContainer>
    <OptionLink to='/shop'>
        SHOP
    </OptionLink>
    <OptionLink to='/shop'>
        Contact
    </OptionLink>
    {
        currentUser ? 
        <OptionDiv onClick={signOutStart}>SIGN OUT</OptionDiv>
        :
        <OptionLink to='/signin'>SIGN IN</OptionLink>

    }
    <CartIcon/>

    </OptionsContainer>

    {
        hidden ? null : 
    <CartDropdown/>
    }
    </HeaderContainer>
)


const mapStateToProps = createStructuredSelector({
    currentUser:selectCurrentUser,
    hidden:selectCartHidden
})

const mapDispatchToProps = dispatch => ({
    signOutStart:()=> dispatch(signOutStart())
})

export default connect(mapStateToProps,mapDispatchToProps)(Header);