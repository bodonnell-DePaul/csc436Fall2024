using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;

namespace poorManReddit;

public class redditContext : DbContext
{   
    public DbSet<Comments> Comments { get; set; }
    public DbSet<Topic> Topics {get; set; }

    public redditContext()
    {
        // var folder = Environment.SpecialFolder.LocalApplicationData;
        // var path = Environment.GetFolderPath(folder);
        // Path = System.IO.Path.Join(path, "reddit.db");
    }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source=reddit.db");

}
