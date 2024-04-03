import Component from 'pages/components/component';

const Components = () => {

    const list = [
        {
            name: 'name',
            description: 'description',
            imgUrl: '#'
        }
    ]

    return (
        <div className=''>
            {list.map(() => (
                <Component />
            ))}
        </div>
    )
}

export default Components;