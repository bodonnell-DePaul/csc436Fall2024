using System;

namespace poorManReddit;
//{"id": 0, "title_id": 1, "thread_id": 2, "title": "The Beginning", "content": "Once upon a time...", "rating":0},
public class Comments
{   
    public int Id { get; set;}
    public int Comment_id { get; set;}
    public int Topic_id { get; set;}
    public int Thread_id {get; set;}
    public string? Title { get; set;}
    public string? Content { get; set;}
    public int Rating { get; set;}

    public Comments(int id, int comment_id ,int topic_id,int thread_id, string title, string content, int rating)
    {
        if (id < 0){
            this.Id = Random.Shared.Next(1000,9999);
        }
        else{
            this.Id = id;
        }
        if(comment_id < 0){
            this.Comment_id = Random.Shared.Next(1000,9999);
        }
        else// if(comment_id >= 0 && comment_id < 25)
        {
            this.Comment_id = comment_id;
        }
        

        if (title != null){
            this.Title = title;
        }

        if(content != null){
            this.Content = content;
        }
        
        this.Topic_id = topic_id;      
        this.Thread_id = thread_id;
        this.Rating = rating;
    }
}
