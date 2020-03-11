import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {fetchCollectionsStartAsync} from '../../Redux/shop/shop.action';
import {selectIsCollectionFetching, selectIsCollectionsLoaded} from '../../Redux/shop/shop.selectors';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../Collection/collection.component';



const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component{

componentDidMount(){
    const{fetchCollectionsStartAsync} = this.props;
    fetchCollectionsStartAsync()
}    
   
render(){
    const {match,isCollectionFetching,isCollectionsLoaded}=this.props
    return(
    <div className='shop-page'>
        <Route exact path={`${match.path}`} render={(props)=><CollectionOverviewWithSpinner isLoading={isCollectionFetching} {...props}/>}/>
        <Route path={`${match.path}/:collectionId`} render={(props)=> <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props}/>}/>
    </div>
)}
}


const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionsLoaded: selectIsCollectionsLoaded
})

const mapDispatchToProps = dispatch =>({
    fetchCollectionsStartAsync:()=>dispatch(fetchCollectionsStartAsync())
}

)



export default connect(mapStateToProps,mapDispatchToProps)(ShopPage);