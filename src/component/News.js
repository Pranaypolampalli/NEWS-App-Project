import React, { Component } from 'react'
import Newsitem from './Newsitem'
import PropTypes from 'prop-types'


export class News extends Component {

static defaultProps = {
  country:"us",
  pageSize:12,
  category:"general",
}

static propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

constructor(){
  super();
  this.state={
    //articles:this.articles
    articles :[],
    page:1
  }
}


async componentDidMount(){
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=79140936891d4e01b28e224727b7ff06`;
  let data= await fetch(url);
  let parsedData=await data.json();
  this.setState({articles:parsedData.articles,
    totalResults:parsedData.totalResults
  }

  );
  
}

prevpg = async ()=>{
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=79140936891d4e01b28e224727b7ff06&page=${this.state.page-1}&pageSize=12`;
  let data= await fetch(url);
  let parsedData=await data.json();
  this.setState({
    page:this.state.page-1,
    articles:parsedData.articles});

}

 nxtpg = async ()=>{
  if(this.state.page+1 > Math.ceil(this.state.totalResults/12)){

  }
  else{
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=79140936891d4e01b28e224727b7ff06&page=${this.state.page+1}&pageSize=12`;
  let data= await fetch(url);
  let parsedData=await data.json();
  this.setState({
    page:this.state.page+1,
    articles:parsedData.articles});
  }

}



  render() {
    return (
      <div className='container my-3'>
        <div className='row'>
          {this.state.articles.map((element)=>{
            return  <div className='col-md-4 my-3' key={element.url}>
            <Newsitem title={element.title?element.title.slice(0,30):""} description={element.description?element.description.slice(0,30):""} imgUrl={element.urlToImage?element.urlToImage:"https://thehill.com/wp-content/uploads/sites/2/2024/09/Carville-Harris-09.03.png?w=1280"} url={element.url}/>
            </div>
          })}
         
         

        </div>
        <div className="container">
        <div className="d-grid gap-2 d-md-flex justify-content-center">
  <button classNmae="btn btn-primary me-md-2" type="button" disabled={this.state.page<=1} onClick={this.prevpg}>Previous</button>
  <button className="btn btn-primary" type="button" disabled={this.state.page+1 > Math.ceil(this.state.totalResults/12)}onClick={this.nxtpg} >Next</button>
</div>
        </div>
    
      </div>
    )
  }
}

export default News