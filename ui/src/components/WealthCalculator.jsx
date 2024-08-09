import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

function WealthCalculator({ patrimoine, setCalculatedWealth, setSelectedDate, selectedDate }) {
  const handleCalculateWealth = () => {
    if (patrimoine) {
      const wealth = patrimoine.getValeur(selectedDate);
      setCalculatedWealth(wealth);
    }
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          
          <Form>
            <Form.Group controlId="datePicker">
              <Form.Label>Select Date</Form.Label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy/MM/dd"
                className="form-control"
              />
            </Form.Group>
            <Button 
              variant="dark" 
              onClick={handleCalculateWealth} 
              className="mt-3 w-100"
            >
              Calculate Wealth
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default WealthCalculator;
