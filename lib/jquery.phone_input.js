(function($) {
  $.fn.phone_input = function () {
    return this.each(function() {
      var $this = $(this);

      $this.val(format_number($this.val()));

      $this.keydown(function(e) {
        if(e.which === 8) {
          e.preventDefault();
        }
      });

      $this.keyup(function(e) {
        if(e.which === 8) {
          var unformatted_number = unformat_number($this.val()),
              unformatted_number_minus_one_character = unformatted_number.substring(0, unformatted_number.length - 1);

          $this.val(format_number(unformatted_number_minus_one_character));

          e.preventDefault();
        } else {
          $this.val(format_number($this.val()));
        }
      });

      $this.parents('form').submit(function() {
        var unformatted_number = unformat_number($this.val());

        if(unformatted_number[0] === '1') {
          $this.val(unformatted_number.substring(1, unformatted_number.length));
        } else {
          $this.val(unformatted_number);
        }
      });
    });

    function unformat_number(formatted_number) {
      return formatted_number.replace(/\D+/g, '');
    }

    function format_number(number) {
      var unformatted_number = unformat_number(number);

      if(unformatted_number.length < 3 || unformatted_number.length > 11) {
        return unformatted_number;
      } else {
        if(unformatted_number[0] === '1') {
          if (unformatted_number.length < 4) {
            return unformatted_number;
          } else {
            return '1 ' + format_number_without_country_code(unformatted_number.substring(1, unformatted_number.length));
          }

        } else {
          if (unformatted_number.length > 10) {
            return unformatted_number;
          } else {
            return format_number_without_country_code(unformatted_number);
          }
        }
      }
    }

    function format_number_without_country_code(unformatted_number) {
      var parsed_number = parse_number(unformatted_number),
          formatted_number = '(' + parsed_number.area + ')';

      if(parsed_number.prefix !== '') {
        formatted_number += ' ' + parsed_number.prefix;
      }

      if(parsed_number.line !== '') {
        formatted_number += '-' + parsed_number.line;
      }

      return formatted_number;
    }

    function parse_number(number) {
      return {area: number.substring(0,3), prefix: number.substring(3,6), line: number.substring(6,10)};
    }
  };
})(jQuery)

