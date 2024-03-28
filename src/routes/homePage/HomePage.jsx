import SearchBar from '../../components/searchbar/SearchBar'
import './homePage.scss'

function HomePage() {
    return (
        <div className='homePage'>
            <div className="textContainer">
                <div className="wrapper">
                    <h1 className='title'>
                        Find PG & Stay in your Dream Room
                    </h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem molestias maiores explicabo quas mollitia blanditiis? Quis, dicta tempora debitis sint sunt consequuntur unde amet, non iure laborum eveniet cumque quae.
                    </p>
                    <SearchBar />
                    <div className="boxes">
                        <div className="box">
                            <h1>16+</h1>
                            <h2>Years of Experience</h2>
                        </div>
                        <div className="box">
                            <h1>200+</h1>
                            <h2>Award Gained</h2>
                        </div>
                        <div className="box">
                            <h1>2000</h1>
                            <h2>Rooms Ready</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="imgContainer">
                <img src="/newbg4.png" alt="bg" />
            </div>
        </div>
    )
}
export default HomePage

