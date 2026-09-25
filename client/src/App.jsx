import {Search,Favourites,Account} from './pages/ShopUtilities';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Product from './pages/Product';
import Finder from './pages/Finder';
import Bag from './pages/Bag';
import {Community,Discovery,HowToBuy,Journal,Returns,Reviews,Story} from './pages/ContentPages';
import {Contact,Engage,Packaging,TrackOrder} from './pages/InteractivePages';
import {PageHero} from './components/UI';
const router=createBrowserRouter([{path:'/',element:<Layout/>,children:[{index:true,element:<Home/>},{path:'collection',element:<Collection/>},{path:'collection/:slug',element:<Product/>},{path:'find-your-moment',element:<Finder/>},{path:'our-story',element:<Story/>},{path:'community',element:<Community/>},{path:'journal',element:<Journal/>},{path:'how-to-buy',element:<HowToBuy/>},{path:'engage',element:<Engage/>},{path:'discovery-gifting',element:<Discovery/>},{path:'packaging',element:<Packaging/>},{path:'reviews',element:<Reviews/>},{path:'contact',element:<Contact/>},{path:'returns',element:<Returns/>},{path:'track-order',element:<TrackOrder/>},{path:'bag',element:<Bag/>},{path:'search',element:<Search/>},{path:'favourites',element:<Favourites/>},{path:'account',element:<Account/>},{path:'*',element:<PageHero kicker="404" title="Moment not found" description="Return home and continue exploring Zanshin."/>}]}]);
export default function App(){return <RouterProvider router={router}/>}
