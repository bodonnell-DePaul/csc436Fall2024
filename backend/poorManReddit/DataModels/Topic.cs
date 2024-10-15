using System;

namespace poorManReddit;


public class Topic
{
    public int Id { get; set;}
    public int Topic_id { get; set;}
    public string? Title { get; set;}
    public string? Content {get;set;}
    public int Rating{get;set;}

    public Topic(int id, int topic_id, string? title, string content, int rating)
    {
        if(id < 0){
            this.Id = Random.Shared.Next(1000, 9999);
        }
        else{
            this.Id = id;
        }
        if(topic_id < 0){
            this.Topic_id = Random.Shared.Next(1000, 9999);
        }
        else{ //if(topic_id < 4 && topic_id > 0){
            this.Topic_id = topic_id;
        }

        if(title.Length > 0){
            this.Title = title;
        }
        
        if(content.Length > 0){
            this.Content = content;
        }
        
        this.Rating = rating;

    }
    
}
