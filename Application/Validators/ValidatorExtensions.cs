using FluentValidation;

namespace Application.Validators
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder
            .NotEmpty()
            .MinimumLength(8).WithMessage("Password needs to contain at least eight or more characters")
            .Matches("[A-Z]").WithMessage("Password needs to contain at least one or more uppercase characters")
            .Matches("[a-z]").WithMessage("Password needs to contain at least one or more lowercase characters")
            .Matches("[0-9]").WithMessage("Password needs to contain at least one or more numbers")
            .Matches("[^a-zA-Z0-9]").WithMessage("Password needs to contain at least one or more non alphanumeric characters !");

            return options;
        }
    }
}