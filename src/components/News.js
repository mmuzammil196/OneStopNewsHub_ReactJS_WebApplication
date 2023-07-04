import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props)=> {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    

    const capitlizeFirstLetter = (word) =>
    {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

//   constructor(props){
//     super(props);
//     // console.log("I am a constructor from newsitems.");
//     // this.state = {
        
//     // }
//     // document.title = `OneStopNewsHub | ${this.capitlizeFirstLetter(props.category)}`
// }

const updateNews = async()=> {
  props.setProgress(30);
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
  setLoading(true)
  let data = await fetch(url);
  props.setProgress(50);
  let parseData = await data.json();
  props.setProgress(70);
  // console.log(parseData);
  setArticles(parseData.articles);
  setTotalResults(parseData.totalResults)
  setLoading(false)
  props.setProgress(100);
}

useEffect(() => {
  document.title = `OneStopNewsHub | ${capitlizeFirstLetter(props.category)}`
  updateNews();
  // eslint-disable-next-line
}, [])
  

  // async componentDidMount(){
  //   // console.log('run after render');
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2be145da4a2c4725aa35241ab34cf5e5&page=1&pageSize=${props.pageSize}`;
  //   // let data = await fetch(url);
  //   // let parseData = await data.json();
  //   // console.log(parseData);
  //   // this.setState({articles : parseData.articles, totalResults : parseData.totalResults})
  //   this.updateNews();
  // }
  
  // const handlePrevClick = async ()=>{
    // console.log("Previous");
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2be145da4a2c4725aa35241ab34cf5e5&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
    // this.setState({loading : true})
    // let data = await fetch(url);
    // let parseData = await data.json();
    // // console.log(parseData);

    // this.setState({
    //   page : this.state.page - 1,
    //   articles : parseData.articles,
    //   loading : false
    // })

  //   this.setState({
  //       page : this.state.page - 1
  // })
  // setPage(page - 1)
  // updateNews();
  // }

  // const handleNextClick = async ()=>{
    // console.log("Next");
  //   if (!( this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize))){

    

  //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2be145da4a2c4725aa35241ab34cf5e5&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
  //     let data = await fetch(url);
  //     this.setState({loading : true})
  //     let parseData = await data.json();
  //     // console.log(parseData);

  //     this.setState({
  //       page : this.state.page + 1,
  //       articles : parseData.articles,
  //       loading : false
    
  //   })
  
  // }

  // this.setState({
  //   page : this.state.page + 1 })
//   setPage(page + 1)
//     updateNews();
// }

const fetchMoreData = async() => {
//  this.setState({page : this.state.page + 1});
 
 const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
 setPage(page + 1)
 let data = await fetch(url);
 let parseData = await data.json()
 setArticles(articles.concat(parseData.articles))
 setTotalResults(parseData.totalResults)
  // console.log(parseData);
//  this.setState({articles : this.state.articles.concat(parseData.articles), totalResults : parseData.totalResults, loading: false})
};


  
    return (
      <>
      {/* // <div className='container my-4'> */}
        <h1 className="text-center" style={{margin: "35px 0px", marginTop: "90px"}}>OneStopNewsHub - Top {capitlizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
        <div className="row">
          {articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <NewsItem title = {element.title?element.title.slice(0, 42):""} description = {element.description?element.description.slice(0, 83):""} imageUrl = {element.urlToImage} newsUrl = {element.url} author = {element.author} date = {element.publishedAt} source = {element.source.name} />
            </div>
          })}
        </div> 
        </div>
        </InfiniteScroll> 
             
      {/* </div> */}
      </>
    )
  
}

News.defaultProps = {
  country: "us", // <-- how can I validate that this is a component class (or stateless functional component)?
  pageSize: 6,
  category: "general"
};
News.propTypes = {
  country: PropTypes.string, // <-- how can I validate that this is a component class (or stateless functional component)?
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News
