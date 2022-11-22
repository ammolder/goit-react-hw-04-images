import { useState, useEffect } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { fetchImage } from './api/service-api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Wrapper } from './App.styled';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [page, setPage] = useState(1);
  const [imageSearch, setImageSearch] = useState('');
  const [imageData, setImageData] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (imageSearch === '') {
      return;
    }
    setStatus('pending');

    const fetchData = async () => {
      try {
        const imageData = await fetchImage(imageSearch, page);
        setImageData(prevState => [...prevState, ...imageData]);

        setStatus('resolved');
      } catch (error) {
        setError({
          error: 'Sorry, failed to load dog breed',
          status: 'rejected',
        });
      }
    };
    fetchData();
  }, [imageSearch, page]);

  const handleSearchSubmit = imageSearch => {
    setImageData([]);
    setImageSearch(imageSearch);
    setPage(1);
  };

  const onLoadMoreClick = () => {
    setPage(prevState => prevState + 1);
  };

  if (status === 'idle') {
    return (
      <Wrapper>
        <SearchBar onSubmit={handleSearchSubmit} />
      </Wrapper>
    );
  }
  if (status === 'pending') {
    return <Loader />;
  }
  if (status === 'rejected') {
    return <p>{error.message}</p>;
  }
  if (status === 'resolved') {
    return (
      <Wrapper>
        <SearchBar onSubmit={handleSearchSubmit} />
        <ImageGallery dataBase={imageData} loadMoreClick={onLoadMoreClick} />
      </Wrapper>
    );
  }
};

// export class OldApp extends Component {
//   state = {
//     page: 1,
//     imageSearch: '',
//     imageData: [],
//     error: null,
//     status: 'idle',
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     if (prevState.imageSearch !== this.state.imageSearch) {
//       this.setState({ status: 'pending' });

//       try {
//         const imageData = await fetchImage(
//           this.state.imageSearch,
//           this.state.page
//         );
//         this.setState({ imageData, status: 'resolved' });
//       } catch (error) {
//         this.setState({
//           error: 'Sorry, failed to load dog breed',
//           status: 'rejected',
//         });
//       }
//     }

//     if (
//       prevState.page !== this.state.page &&
//       prevState.imageSearch === this.state.imageSearch
//     ) {
//       this.setState({ status: 'pending' });

// try {
//   const imageData = await fetchImage(
//     this.state.imageSearch,
//     this.state.page
//   );
//   this.setState(prevState => ({
//     imageData: [...prevState.imageData, ...imageData],
//     status: 'resolved',
//   }));
// } catch (error) {
//   this.setState({
//     error: 'Sorry, failed to load dog breed',
//     status: 'rejected',
//   });
// }
//     }
//   }
// handleSearchSubmit = imageSearch => {
//   this.setState({ imageSearch });
//   this.setState({ page: 1 });
// };

// onLoadMoreClick = () => {
//   this.setState(prevState => ({
//     page: prevState.page + 1,
//   }));
// };

//   render() {
//     const { error, status, imageData } = this.state;

//     if (status === 'idle') {
//       return (
//         <Wrapper>
//           <SearchBar onSubmit={this.handleSearchSubmit} />
//         </Wrapper>
//       );
//     }
//     if (status === 'pending') {
//       return <Loader />;
//     }
//     if (status === 'rejected') {
//       return <p>{error.message}</p>;
//     }
//     if (status === 'resolved') {
//       return (
//         <Wrapper>
//           <SearchBar onSubmit={this.handleSearchSubmit} />
//           <ImageGallery
//             dataBase={imageData}
//             clickModal={this.toggleModal}
//             loadMoreClick={this.onLoadMoreClick}
//           />
//         </Wrapper>
//       );
//     }
//   }
// }
