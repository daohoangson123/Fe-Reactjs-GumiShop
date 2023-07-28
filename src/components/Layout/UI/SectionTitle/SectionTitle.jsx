import { memo } from 'react';
import './SectionTitle.css';

function SectionTitle({ content }) {
    return <h2 className='SectionTitle'>{content}</h2>;
}

export default memo(SectionTitle);
