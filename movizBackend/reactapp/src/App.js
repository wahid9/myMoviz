import React, { useState, useEffect } from 'react';
import './App.css';
import {Container, Row, Nav, NavItem, NavLink, Button, Popover, PopoverBody, PopoverHeader, ListGroup, ListGroupItem} from 'reactstrap';
import Movie from './components/Movie'


function App() {

    const [moviesCount, setMoviesCount] = useState(0)
    const [movieSelected, setMovieSelected] = useState([])

    const [popoverOpen, setPopoverOpen] = useState(false);

    const toggle = () => setPopoverOpen(!popoverOpen);

    const [movieListe, setMovieListe] = useState([])

    useEffect(async () =>{

        var rawData = await fetch('/new-movies');
        var data = await rawData.json();
        console.log(data.result);
        setMovieListe(data.result)

        var reponse = await fetch('/wishlist-movie');
        var rep = await reponse.json();
        console.log(rep.movies);
        setMovieSelected(rep.movies)
        
    },[])
    
    var handleClickAddMovie = async (name, img) => {

        await fetch('/wishlist-movie', {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `name=${name}&img=${img}`
        });

        setMoviesCount(moviesCount +1);
        setMovieSelected([...movieSelected, {name, img}])
        
    }

    var handleClickDeleteMovie = async (name) => {

        setMoviesCount(moviesCount -1);
        setMovieSelected(movieSelected.filter((movie)=>(movie.name != name)))

        await fetch(`/wishlist-movie/${name}`, {
            method: 'DELETE'
        });
        
        // console.log('yeeessssss');
    }

    // var wishlistClick = (name) => {
    //     setMoviesCount(moviesCount -1);
    //     setMovieSelected(movieSelected.filter((movie)=>(movie !== name)))
    //     console.log('clic detecte');
    // }

    var movieWishList = movieSelected.map(movie=>{
        return <ListGroupItem onClick={()=>handleClickDeleteMovie(movie.name)}>
                    <img src={movie.img} width='25%'/> {movie.name}
                </ListGroupItem>
    },
    );


    // var movieData = [{name: 'Bad Boy 3', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lobortis eget est ut dignissim. Donec at velit risus. Vestibulum cursus.', img: './img/badboy3.jpg', note: 8, vote: 8},
    //                  {name: 'Frozen', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lobortis eget est ut dignissim. Donec at velit risus. Vestibulum cursus.', img: './img/frozen.jpg', note: 6.4, vote: 8},
    //                  {name: 'Jumanji', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lobortis eget est ut dignissim. Donec at velit risus. Vestibulum cursus.', img: './img/jumanji.jpg', note: 4, vote: 8},
    //                  {name: 'Maleficient', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lobortis eget est ut dignissim. Donec at velit risus. Vestibulum cursus.', img: './img/maleficent.jpg', note: 4, vote: 8},
    //                  {name: 'StarWars', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lobortis eget est ut dignissim. Donec at velit risus. Vestibulum cursus.', img: './img/starwars.jpg', note: 4, vote: 8},
    //                  {name: 'Terminator', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lobortis eget est ut dignissim. Donec at velit risus. Vestibulum cursus.', img: './img/terminator.jpg', note: 4, vote: 8}
    //                 ]

    var movieList = movieListe.map(movie=>{
        var result = movieSelected.find(element=> element.name == movie.original_title)
        // var result = movieSelected.indexOf(movie)
        var isSee = false
        if(result != undefined){
        // if(result != -1){
            isSee = true
        }
        var desc = ''
        if(movie.overview.length>80){
            desc = movie.overview.slice(0,80)+'...'
        }
        return <Movie movieSee={isSee} movieName={movie.original_title} movieDesc={desc} movieImg={'https://image.tmdb.org/t/p/w500/'+movie.backdrop_path} globalRating={movie.vote_average} globalCountRating={movie.vote_count} handleAddClickParent={handleClickAddMovie} handleDeleteClickParent={handleClickDeleteMovie}/>
    })


    return (
        <div style={{backgroundColor: '#2f3640'}}>
            <Container>
                
                    <Nav>
                        <NavItem>
                            <img src='./img/logo.png'></img>
                        </NavItem>
                        <NavItem>
                            <NavLink style={{color: 'white'}}>Last Releases</NavLink>
                        </NavItem>
                        
                        <div>
                            <Button id="Popover1" type="button">
                                {movieSelected.length} films
                            </Button>
                            <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
                                <PopoverHeader>Whishlist</PopoverHeader>
                                <PopoverBody>
                                    <ListGroup>
                                        {movieWishList}
                                    </ListGroup>
                                </PopoverBody>
                            </Popover>
                        </div>
                    </Nav>
            
                <Row>
                    {movieList}
                </Row>
            </Container>
        </div>
    );
}

export default App;
