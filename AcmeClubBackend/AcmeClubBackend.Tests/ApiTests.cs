using AcmeClubBackend.Controllers;
using AcmeClubBackend.Models;
using Microsoft.AspNetCore.Mvc.Testing;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace AcmeClubBackend.Tests
{
    public class ApiTests
    {
        string url = "api/Registrations/";
        [Fact]
        public async Task ObjectCreationTest()
        {
            // Arrange
            var appFactory = new WebApplicationFactory<Program>();
            var httpClient = appFactory.CreateClient();

            Registration registration = new Registration
            {
                StartDate = DateTime.Parse("2022-04-17T21:44:25.235"),
                FirstName = "Farzam",
                LastName = "Mohammadi",
                YearsOfExperience = "2",
                Activity = "Zumba",
                Email = "farzamTestingPurposesOnly@gmail.com",
                Comments = "I'm a Zumba master!"
            };

            // Act
            var response = await httpClient.PostAsJsonAsync(url, registration);

            var responseStatusCode = response.StatusCode.ToString();
            var responseJsonResult = JObject.Parse(await response.Content.ReadAsStringAsync());

            // Assert
            Assert.Equal("Created", responseStatusCode);
            Assert.Equal(responseJsonResult["email"], registration.Email);
        }
        [Fact]
        public async Task DBModelValidationTest()
        {
            // Arrange
            var appFactory = new WebApplicationFactory<Program>();
            var httpClient = appFactory.CreateClient();

            // Missing required email field
            Registration registration = new Registration
            {
                StartDate = DateTime.Parse("2022-04-17T21:44:25.235"),
                FirstName = "Farzam",
                LastName = "Mohammadi",
                YearsOfExperience = "2",
                Activity = "Zumba",
            };

            // Act
            var response = await httpClient.PostAsJsonAsync(url, registration);

            var responseStatusCode = response.StatusCode.ToString();

            // Assert
            Assert.Equal("BadRequest", responseStatusCode);
        }
        [Fact]
        public async Task ObjectRetrievalTest()
        {
            // Arrange
            var appFactory = new WebApplicationFactory<Program>();
            var httpClient = appFactory.CreateClient();

            // Act
            var response = await httpClient.GetAsync(url);

            var responseStatusCode = response.StatusCode.ToString();

            // Assert
            Assert.Equal("OK", responseStatusCode);
        }
    }
}