
describe "phone_input"
  before
    $body = $(fixture("jquery_phone_input"));
  end

  before_each
    $body.find("#phone-number").phone_input();
  end

  describe "delete character"
    it "unformats input field"
      var e = $.Event("keyup");
      e.which = 8;

      $body.find("#phone-number").val("(222) 333-4444").trigger(e);
      $body.find("#phone-number").should.have_value("(222) 333-444");
    end
  end

  describe "formats user input"
    describe "number with country code"
      it "formats area code"
        $body.find("#phone-number").val("1").trigger('keyup');
        $body.find("#phone-number").should.have_value("1");

        $body.find("#phone-number").val("12").trigger('keyup');
        $body.find("#phone-number").should.have_value("12");

        $body.find("#phone-number").val("122").trigger('keyup');
        $body.find("#phone-number").should.have_value("122");

        $body.find("#phone-number").val("1222").trigger('keyup');
        $body.find("#phone-number").should.have_value("1 (222)");
      end

      it "formats prefix"
        $body.find("#phone-number").val("12223").trigger('keyup');
        $body.find("#phone-number").should.have_value("1 (222) 3");

        $body.find("#phone-number").val("122233").trigger('keyup');
        $body.find("#phone-number").should.have_value("1 (222) 33");

        $body.find("#phone-number").val("1222333").trigger('keyup');
        $body.find("#phone-number").should.have_value("1 (222) 333");
      end

      it "formats line number"
        $body.find("#phone-number").val("12223334").trigger('keyup');
        $body.find("#phone-number").should.have_value("1 (222) 333-4");

        $body.find("#phone-number").val("122233344").trigger('keyup');
        $body.find("#phone-number").should.have_value("1 (222) 333-44");

        $body.find("#phone-number").val("1222333444").trigger('keyup');
        $body.find("#phone-number").should.have_value("1 (222) 333-444");

        $body.find("#phone-number").val("12223334444").trigger('keyup');
        $body.find("#phone-number").should.have_value("1 (222) 333-4444");
      end

      it "does not format number with more than 11 digits"
        $body.find("#phone-number").val("122233344445").trigger('keyup');
        $body.find("#phone-number").should.have_value("122233344445");
      end
    end

    describe "number without country code"
      it "formats area code"
        $body.find("#phone-number").val("2").trigger('keyup');
        $body.find("#phone-number").should.have_value("2");

        $body.find("#phone-number").val("22").trigger('keyup');
        $body.find("#phone-number").should.have_value("22");

        $body.find("#phone-number").val("222").trigger('keyup');
        $body.find("#phone-number").should.have_value("(222)");
      end

      it "formats prefix"
        $body.find("#phone-number").val("2223").trigger('keyup');
        $body.find("#phone-number").should.have_value("(222) 3");

        $body.find("#phone-number").val("22233").trigger('keyup');
        $body.find("#phone-number").should.have_value("(222) 33");

        $body.find("#phone-number").val("222333").trigger('keyup');
        $body.find("#phone-number").should.have_value("(222) 333");
      end

      it "formats line number"
        $body.find("#phone-number").val("2223334").trigger('keyup');
        $body.find("#phone-number").should.have_value("(222) 333-4");

        $body.find("#phone-number").val("22233344").trigger('keyup');
        $body.find("#phone-number").should.have_value("(222) 333-44");

        $body.find("#phone-number").val("222333444").trigger('keyup');
        $body.find("#phone-number").should.have_value("(222) 333-444");

        $body.find("#phone-number").val("2223334444").trigger('keyup');
        $body.find("#phone-number").should.have_value("(222) 333-4444");
      end

      it "does not format number with more than 10 digits"
        $body.find("#phone-number").val("22233344445").trigger('keyup');
        $body.find("#phone-number").should.have_value("22233344445");
      end
    end
  end

  describe "form submit"
    it "unformats input field"
      $body.find("#phone-number").val("(222) 333-4444").trigger('submit');
      $body.find("#phone-number").should.have_value("2223334444");
    end

    it "truncates country code"
      $body.find("#phone-number").val("1 (222) 333-4444").trigger('submit');
      $body.find("#phone-number").should.have_value("2223334444");
    end
  end
end


