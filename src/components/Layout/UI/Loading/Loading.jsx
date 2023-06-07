import './Loading.css';

const Loading = ({ loadingContent }) => {
    return (
        <div className='Loading'>
            {loadingContent ? loadingContent : 'Please wait a sec...'}
            <div className='Loading__Animation'>
                <i className='fa-solid fa-spinner fa-spin'></i>
            </div>
        </div>
    );
};

export default Loading;
