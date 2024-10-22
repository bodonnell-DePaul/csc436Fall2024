using System;
namespace poorManReddit.DataModels;

public class PublicUsers{
    public string userName {get;set;}
    public string password {get;set;}
    protected PrivateUsers pu;   

    public PublicUsers(string userName, string password) {
        this.userName = userName;
        this.password = password;

        this.pu = new PrivateUsers(this.userName, this.password);
    }

    public PrivateUsers GetPrivateUser()
    {
        return pu;
    }
}