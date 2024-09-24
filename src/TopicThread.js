

function TopicThread({comments}){

    const matchedComments = comments.map((chat, index) => {
        return(
            <div>
                <strong>{chat.title}</strong>
                <p>{chat.content}</p>
            </div>
        );
    });


    return(
        <div>
            {matchedComments}
        </div>
    );

};

export default TopicThread;