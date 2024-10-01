using System;

namespace poorManReddit;
//{"id": 0, "title_id": 1, "thread_id": 2, "title": "The Beginning", "content": "Once upon a time...", "rating":0},
public class Comments
{
    public int Id { get; set;}
    public int Title_Id { get; set;}
    public int Thread_Id {get; set;}
    public string? Title { get; set;}
    public string? Content { get; set;}
    public int Rating { get; set;}
}
