using System.Collections.Generic;
using DatingApp.API.Models;
using Newtonsoft.Json;

namespace DatingApp.API.Data
{
    public class Seed
    {
        private readonly DataContext _context;
        public Seed(DataContext context)
        {
            _context = context;

        }

        public void SeedUsers(){

            var UserData = System.IO.File.ReadAllText("Data/UserSeedData.json");
            var users = JsonConvert.DeserializeObject<List<User>>(UserData);

            foreach (var user in users)
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHarsh("password", out passwordHash, out passwordSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
                user.Username = user.Username.ToLower();

                _context.Users.Add(user);
                
            }
            _context.SaveChanges();
        }

           private void CreatePasswordHarsh(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
           using ( var hamc = new System.Security.Cryptography.HMACSHA512() ){
               
               passwordSalt = hamc.Key;
               passwordHash = hamc.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
           }
        }

    }
}