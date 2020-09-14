import React, {useState, useEffect} from 'react';
import Product from './Product';

const Home = () => {

    const [products, setProducts] = useState('');
    const [images, setImages] = useState('');
    const [width, setWidth] = useState(window.innerWidth);
    const [fullProducts, setFullProducts] = useState('');

    useEffect(() => {
        fetch('https://laborh-admin.herokuapp.com/api/products')
            .then(response => response.json())
            .then(data => {setProducts(data); setFullProducts(data)});

        fetch('https://laborh-admin.herokuapp.com/api/images')
            .then(response => response.json())
            .then(data => setImages(data));
    }, [])

    const getProducts = () => {
        if (products === '' || images === '' || width === '') {return ''}
        const imgWidth = width < 420 ? '150px' : '200px';
        return products.map(product => {
            const imageRef = images.findIndex(img => img.productId === product._id);
            return <Product key={product._id} name={product.name} price={product.price} width={imgWidth} image={images[imageRef].imageData}/>
        })
    }

    const sort = (category) => {
        switch (category) {
            case 'shirts':
                const shirts = fullProducts.filter(product => product.style[0] === 'shirt')
                setProducts(shirts);
                break;
            case 'pants':
                const pants = fullProducts.filter(product => product.style[0] === 'pants')
                setProducts(pants);
                break;
            case 'shoes':
                const shoes = fullProducts.filter(product => product.style[0] === 'shoes')
                setProducts(shoes);
                break;
            case 'jackets':
                const jackets = fullProducts.filter(product => product.style[0] === 'jacket')
                setProducts(jackets);
                break;
            case 'socks':
                const socks = fullProducts.filter(product => product.style[0] === 'socks')
                setProducts(socks);
                break;
            default:
                const hoodies = fullProducts.filter(product => product.style[0] === 'hoodie')
                setProducts(hoodies);
                break;
        }
    }

    return (
        <>
        <nav className='nav-mobile'>
            <i></i>
            <h1 className='logo logo-mobile' onClick={() => setProducts(fullProducts)}>La'Borh</h1>
            <i className='fa fa-user'></i>
            <i className='fa fa-search'></i>
            <i className='fa fa-shopping-cart'></i>
        </nav>
        <main>
            <aside>
                <div className='categories'>
                    <h5 onClick={() => sort('shirts')}>Shirts</h5>
                    <h5 onClick={() => sort('pants')}>Pants</h5>
                    <h5 onClick={() => sort('shoes')}>Shoes</h5>
                    <h5 onClick={() => sort('jackets')}>Jackets</h5>
                    <h5 onClick={() => sort('socks')}>Socks</h5>
                    <h5 onClick={() => sort('hoodies')}>Hoodies</h5>
                </div>
                <div className='user-help'>
                    <h5>Search</h5>
                    <h5>Manage Account</h5>
                    <h5>Sign up</h5>
                </div>
            </aside>
            <section>
                {getProducts()}
            </section>
        </main>
        </>
    )
}

export default Home;