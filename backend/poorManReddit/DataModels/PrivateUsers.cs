using System;
using System.Security.Cryptography;

namespace poorManReddit.DataModels;

public class PrivateUsers
{
    public int Id { get; set;}
    public string Name { get; set;}
    public string Username{get; set;}
    public string base64Creds {get; set;}
    public string hash {get;set;}
    public string Password {get; set;}
    public string Preferences {get; set;}
    

    public PrivateUsers(string username, string password)
    {
        this.Id = System.Security.Cryptography.RandomNumberGenerator.GetInt32(1000);
        this.Username = username;
        this.Name = username;
        
        this.base64Creds = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(username + ":" + password));
        var byteCredentials = Convert.FromBase64String(this.base64Creds);
        using (SHA256 sha256Hash = SHA256.Create())
        {
            byte[] bytes = sha256Hash.ComputeHash(byteCredentials);
            System.Text.StringBuilder builder = new System.Text.StringBuilder();
            for (int i = 0; i < bytes.Length; i++)
            {
                builder.Append(bytes[i].ToString("x2"));
            }
            this.hash = builder.ToString();
        }
        this.Password = this.hash;

        this.Preferences = "default";
    }


}
