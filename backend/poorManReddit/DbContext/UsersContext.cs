using System;
using Microsoft.EntityFrameworkCore;
using poorManReddit.DataModels;


namespace poorManReddit;

public class UsersContext : DbContext
{
    public DbSet<PrivateUsers> users {get;set;}

    public UsersContext(){
        
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source=users.db");
}
