import './Loading.css';

const Loading = ({ loadingContent }) => {
    return (
        <div className='Loading'>
            {loadingContent ? loadingContent : 'Please wait a sec...'}
            <div className='Loading__Animation'></div>
        </div>
    );
};

export default Loading;
